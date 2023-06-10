//Wave 1
const state = {
    // HTML elements
    currentTempButton: null,
    increaseTempControl: null,
    decreaseTempControl: null,
    landscapeDiv: null,
    // Data
    tempValue: null,
    tempCount: 0, // change this to the const for temp pulled in from API
    skySelection: null,
    skyDiv: null,
};

const loadControls = () => {
    // Retrieve references to all HTML elements we need to access
    state.increaseTempControl = document.getElementById("increaseTempControl");
    state.decreaseTempControl = document.getElementById("decreaseTempControl");
    state.tempValue = document.getElementById("tempValue");
    state.tempValue.textContent = state.tempCount
    state.currentTempButton = document.getElementById("currentTempButton");
    state.skySelection = document.getElementById("skySelect");
    state.skyDiv = document.getElementById("sky");
    state.landscapeDiv = document.getElementById("landscape");
    state.header__cityName = document.getElementById("header__cityName");
    state.headerCityNameDiv = document.getElementById("headerCityName");
    state.accessCity = document.getElementById("cityNameInput");
};

const handleCurrentTempClick = (event) => {
    // function to call API for current temp based on geo coordinates (will pull in Kelvin)
    state.tempValue.textContent = state.tempCount
    displayLandscape();
    temperatureColor();
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

const displayCityName = (event) => {
    state.header__cityName.textContent = state.headerCityNameDiv;
};

const displayLandscape = (event) => {
    if (state.tempCount < 59) {
        state.landscapeDiv.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
    } else if (state.tempCount <= 69) {
        state.landscapeDiv.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
    } else if (state.tempCount <= 79) {
        state.landscapeDiv.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
    } else if (state.tempCount >= 80) {
        state.landscapeDiv.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
}};

const colorChange = (color) => {
    document.getElementById("tempValue").style.color = color
};

const temperatureColor = (event) => {
    const temp = state.tempCount
    if (temp <= 49) {
        colorChange("teal");
    } else if (temp <= 59) {
        colorChange("green");
    } else if (temp <= 69) {
        colorChange("yellow");
    } else if (temp <= 79) {
        colorChange("orange");
    } else {
        colorChange("red");
    }
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
    const accessCity = document.getElementById("cityNameInput");
    accessCity.addEventListener("input", changeCity);
};

//WAVE 3
//function validate(input,error)<- do we want to validate/return error message
const changeCity =(event) => {
    const value = document.getElementById('cityNameInput').value;
    const cityName = document.getElementById("headerCityName")
    cityName.textContent = value;
}

// WAVE 4: API Calls
const findLatitudeAndLongtitude = (latitude,longtitude) => {
    axios.get('http://127.0.0.1:5000/location',
    { 
    params: {
        q: cityNameInput.value
    }
})
    .then( (response) => {
        latitude = response.data[0].lat;
        longtitude = response.data[0].lon;
        getWeather(latitude,longtitude)
        
    })
    .catch( (error) => {
        console.log(error)
    })}

const getWeather = (latitude,longtitude) => {
    axios.get('http://127.0.0.1:5000/weather',
    {
    params:{
        lat: latitude,
        lon: longtitude
    }
})
    .then( (response) => {
        console.log('success!',response.data.tempValue);
    })
    .catch ( (error) => {
        console.log('error in getWeather');
    })}

const onLoad = () => {
    // do what we need to do when the page loads
    loadControls();
    registerEvents();
};

document.addEventListener("DOMContentLoaded", onLoad);