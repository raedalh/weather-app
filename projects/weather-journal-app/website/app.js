// Global variables
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';  // OpenWeather API base URL
const apiKey = 'c90de487d4a5915be354e8cd2c477a73';
const submitButton = document.getElementById('generate');  // The "Generate" button

// Initialize the app by adding event listener for button click
submitButton.addEventListener('click', handleWeatherRequest);

// Fetch weather data from OpenWeather API
const getWeatherData = (apiUrl, postalCode, apiKey) => {
    return fetch(`${apiUrl}?q=${postalCode}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched Weather Data:", data); // Log API response
            return data;
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
            throw error; // Propagate error
        });
};

// Send data to server
const sendDataToServer = (url = '', data = {}) => {
    return fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((responseData) => {
            console.log("Server Response:", responseData); // Log server response
            return responseData;
        })
        .catch((error) => {
            console.error('Error posting data:', error);
            throw error; // Propagate error
        });
};

// Update the UI with fetched data
const refreshUI = () => {
    return fetch('http://localhost:3000/all')
        .then((response) => response.json())
        .then((data) => {
            console.log("UI Data:", data); // Log data being used to update UI
            document.getElementById('date').innerHTML = `Date: ${data.date}`;
            document.getElementById('temp').innerHTML = `Temperature: ${data.temperature}°K`;  // Kelvin is shown
            document.getElementById('content').innerHTML = `Feeling: ${data.userContent}`;
        })
        .catch((error) => {
            console.error('Error refreshing UI:', error);
        });
};

// Handle weather request by fetching data, sending to server, and updating UI
function handleWeatherRequest(event) {
    event.preventDefault();

    const postalCode = document.getElementById('zip').value;
    const userContent = document.getElementById('feelings').value;

    console.log("Postal Code:", postalCode);  // Log zip code
    console.log("User Content:", userContent); // Log feelings

    // Check if postal code is valid
    if (postalCode !== '') {
        // If valid, fetch weather data, send it to server, and update UI
        getWeatherData(apiUrl, postalCode, apiKey)
            .then((weatherData) => {
                const formattedDate = new Date().toLocaleString(); // Current date and time
                const dataToSend = {
                    temperature: weatherData.main.temp,
                    date: formattedDate,
                    userContent: userContent
                };
                return sendDataToServer('http://localhost:3000/add', dataToSend);
            })
            .then(() => {
                return refreshUI();
            })
            .catch((error) => {
                console.error('Error during weather request:', error);
                alert('Invalid zip code. Please try again.');
            });

        // Clear input fields after submission
        document.getElementById('zip').value = '';
        document.getElementById('feelings').value = '';
    } else {
        submitButton.classList.add('invalid'); // Highlight the button if zip code is empty
    }
}
