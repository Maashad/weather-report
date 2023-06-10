//Wave 1
const state = {
    // HTML elements
    currentTempButton: null,
    increaseTempControl: null,
    decreaseTempControl: null,
    landscapeDiv: null,
    header__cityName: null,
    headerCityNameDiv: 'Seattle, Washington',
    // Data
    tempValue: null,
    tempCount: 55, // change this to the const for temp pulled in from API
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
    state.landscapeDiv = document.getElementById("landscape");
    state.header__cityName = document.getElementById("header__cityName");
    state.headerCityNameDiv = document.getElementById("headerCityName");
};

const handleCurrentTempClick = (event) => {
    // function to call API for current temp based on geo coordinates (will pull in Kelvin)
    // display the API data in the tempValue element
    displayLandscape();
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

const temperatureColor = (event) => {
    
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

const registerEventHandlers = (event) => {
    state.increaseTempControl.addEventListener("click", handleIncreaseTempClick);
    state.decreaseTempControl.addEventListener("click", handleDecreaseTempClick);
    state.currentTempButton.addEventListener("click", handleCurrentTempClick);
    state.skySelection.addEventListener("change", displaySky);
    const accessCity = document.getElementById("cityNameInput");
    accessCity.addEventListener("input", changeCity);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);

//WAVE 3
//function validate(input,error)<- do we want to validate/return error message
const changeCity =(event) => {
    const value = document.getElementById('cityNameInput').value;
    const cityName = document.getElementById("headerCityName")
    cityName.textContent = value;
}

// WAVE 4: API Calls
const findLatitudeAndLongitude = (q) => {
    let latitude, longitude;
    axios.get('https://localhost:5000/location',
    {
        params: {
            // key: LOCATIONIQ_KEY,
            q: cityNameInput.value,
            // format: 'json',
        }
    .then( (response) => {
        latitude = response.data[0].lat;
        longitude = response.data[0].lon;
        // console.log("location success! ", latitude, longitude);
        
        findWeather(latitude, longitude);
    })
    .catch( (error) => {
        console.log(error)
    })
})};

const findWeather = (latitude, longitude) => {
    axios.get('https://localhost:5000/location',
    {
        params: {
            // key: LOCATIONIQ_KEY,
            // format: 'json',
            lat: latitude,
            long: longitude
        }
    })
    .then ( (response)  => {
        console.log('City location success: ', response.data);
    })
    .catch ( (error) => {
        console.log(error)
    });
};

const onLoad = () => {
    // do what we need to do when the page loads
    loadControls();
    registerEventHandlers();
};

onLoad();