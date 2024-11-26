// Create an empty object to store project data
let projectData = {};

// Import Express to run server and routes
const express = require('express');

// Create an instance of the app
const app = express();

/* Middleware */
// Use Express built-in middleware for parsing URL-encoded data and JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
app.use(cors());

// Serve static files from the 'website' folder
app.use(express.static('website'));

// Define POST route to handle incoming data
app.post('/add', storeWeatherData);

function storeWeatherData(req, res) {
    // Store incoming data in the projectData object
    projectData['temperature'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['userContent'] = req.body.content;

    // Send the stored data as a response
    res.send(projectData);
}

// Define GET route to return all stored data
app.get('/all', fetchStoredData);

function fetchStoredData(req, res) {
    // Return the projectData object as a response
    res.send(projectData);
}

// Set the server to listen on port 3000
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
