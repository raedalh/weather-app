// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
// Replacing body-parser with express built-in middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross-origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// POST route
app.post('/add', addInfo);

function addInfo(req, res) {
    // Store the data coming in the body of the request
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    res.send(projectData); // Send back the data as a response
}

// Initialize all route with a callback function
app.get('/all', getInfo);

// Callback function to complete GET '/all'
function getInfo(req, res) {
    res.send(projectData);
};

// Set up and Spin up the server
const port = 3000;  // Use 3000 or the appropriate port
const server = app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`); // Callback to debug
});
