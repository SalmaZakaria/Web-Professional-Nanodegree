// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));
app.use(express.json());


// Setup Server
const port = 3000;

const server = app.listen(port, Listen);

function Listen(){
	console.log(`Server is Running ${port}`);
};

//Get Function
app.get('/getData', sendingData);

function sendingData(req, res){
	res.send(projectData);
};

//recieve data from post function on client side
app.post('/AddData', AddingData);

function AddingData(req, res){
	let data = req.body;
	console.log('Data on server', data);

	projectData['date'] = data.date;
    projectData['temp'] = data.temp;
    projectData['content'] = data.content;

    res.send(projectData);
};