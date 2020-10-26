/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) +'.'+ d.getDate()+'.'+ d.getFullYear();

//API KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiCode = 'd8937a7e5a0ca2f91d02556a7d345ac1';


//Event Listener to generate button after user click
document.getElementById('generate').addEventListener('click', userClick);

//Returning value of user input to post our data and call the Api
function userClick(){
	const zipCode = document.querySelector( '#zip' ).value;
    const userfeel = document.querySelector( '#feelings' ).value;

    //if user doesn't inpur neither zip code nor feeling it will give him an alert
    if(zipCode == 0 || userfeel.length == 0)
    	alert("Please enter all the data");
    else{
     	getWeatherData(baseUrl, zipCode, apiCode)
       .then(function(data) {
            ToPostData('/AddData', {date: newDate, temp: data.main.temp, content: userfeel});
            updatingUI('/getData');    
       })
    }
};


//fetching with OpenWeather api
const getWeatherData = async(baseUrl, zipCode, apiCode) => {

	let str = await fetch(baseUrl + zipCode + '&appid=' + apiCode + '&units=metric');

	try{
		const Data = await str.json();
		console.log(Data);
		return Data;

	}catch(Error){
		console.log('Error', Error);
	}
};

/*
Async function that request '/AddData' Route
implementing the client code that post data with fetch to api
*/
const ToPostData = async(url='', data = {}) => {
	const posting = {
		method: 'POST',
		 headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data)
	};
	const result = await fetch(url, posting);

	try{
		const userData = await result.json();
		return userData;
	}catch(Error){
		console.log('Error', Error);
	}
};

/* Async function that request '/getData' Route
Adding the data to html to show it in our ui dynamically
*/
const updatingUI = async(url='') => {

	const newRequest = await fetch(url);

	try{
		//reading data from json
		const wholeData = await newRequest.json();

		console.log(wholeData);

		document.getElementById('date').innerText = wholeData.date;
		document.getElementById('temp').innerText = wholeData.temp;
		document.getElementById('content').innerText = wholeData.content;

	}catch(Error){
		console.log('Error', Error);
	}
};