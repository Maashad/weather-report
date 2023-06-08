// Wave 2: Amber
// clickable element to increase temp
// clickable element to decrease temp
// element to display landscape

// Wave 3: Fabiola
// Name the city

// Wave 4: Fabiola and Amber
// Calling API's

// Wave 5: Gabby 
// Selecting the sky

// Wave 6: Gabby
// Reset city name

//Wave 1
const state = {
    // HTML elements
    currentTempButton: null,
    increaseTempControl: null,
    decreaseTempControl: null,
    // Data
    tempValue: null, // ** Should this be null, or pull from the API?
    tempCount: 0,
    skySelection: null,
    skyDiv: null,
};

const loadControls = () => {
    // Retrieve references to all HTML elements we need to access
    state.increaseTempControl = document.getElementById("increaseTempControl");
    state.decreaseTempControl = document.getElementById("decreaseTempControl");
    state.tempValue = document.getElementById("tempValue");
    state.currentTempButton = document.getElementById("currentTempButton");
    state.skySelection = document.getElementById("skySelect");
    state.skyDiv = document.getElementById("sky");
};

const handleCurrentTempClick = (event) => {
    // function to call API for current temp based on geo coordinates (will pull in Kelvin)
    // display the API data in the tempValue element
    console.log("clicked");
};

const handleIncreaseTempClick = (event) => {
    // When clicking on the increase temp button, the temp value should increase by 1
    state.tempCount += 1;
    state.tempValue.textContent = state.tempCount;
};

const handleDecreaseTempClick = (event) => {
    // When clicking on the decrease temp button, the temp value should decrease by 1
    state.tempCount -= 1;
    state.tempValue.textContent = state.tempCount;
};

const displaySky = (event) => {
    if (state.skySelection.value === "sunny") {
        state.skyDiv.textContent = "☀️☀️☀️☀️☀️☀️"
    } else if (state.skySelection.value === "cloudy") {
        state.skyDiv.textContent = "☁️☁️⛅☁️☁️☁️"
    } else if (state.skySelection.value === "rainy") {
        state.skyDiv.textContent = "☁️☔️☁️☁️☔️☁️"
    } else if (state.skySelection.value === "snowy") {
        state.skyDiv.textContent = "☁️❄️☁️❄️☁️❄️"
    }
};

const registerEvents = (event) => {
    state.increaseTempControl.addEventListener("click", handleIncreaseTempClick);
    state.decreaseTempControl.addEventListener("click", handleDecreaseTempClick);
    state.currentTempButton.addEventListener("click", handleCurrentTempClick);
    state.skySelection.addEventListener("change", displaySky);
};

document.addEventListener("DOMContentLoaded", registerEvents);

const onLoad = () => {
    // do what we need to do when the page loads
    loadControls();
    registerEvents();
};

//WAVE 3
//function validate(input,error)<- do we want to validate/return error message
const changeCity =(event) => {
    const value = document.getElementById('cityNameInput').value;
    const cityName = document.getElementById("headerCityName")
    cityName.textContent = value;
}
const registerEventHandlers = (event) => {
    const accessCity = document.getElementById("cityNameInput");
    accessCity.addEventListener("input", changeCity);
};
document.addEventListener("DOMContentLoaded",registerEventHandlers)

// WAVE 4
// Call weather and LocationIQ APIs

const axios = require('axios');

axios
    .get('url')
    .then((response) => {
        ))



onLoad();