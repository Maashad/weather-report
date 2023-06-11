const state = {
    currentTempButton: null,
    increaseTempControl: null,
    decreaseTempControl: null,
    landscapeDiv: null,
    tempValue: null,
    tempCount: 0,
    skySelection: null,
    skyDiv: null,
    cityNameInput: null,
    cityNameHeader: null,
    resetButton: null,
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
    state.cityNameInput = document.getElementById('cityNameInput');
    state.cityNameHeader = document.getElementById("headerCityName");
    state.resetButton = document.getElementById("cityNameReset");
};

const registerEvents = (event) => {
    state.increaseTempControl.addEventListener("click", handleIncreaseTempClick);
    state.decreaseTempControl.addEventListener("click", handleDecreaseTempClick);
    state.currentTempButton.addEventListener("click", handleCurrentTempClick);
    state.skySelection.addEventListener("change", displaySky);
    state.cityNameInput.addEventListener("input", changeCity);
    state.resetButton.addEventListener("click", resetCityName);
};

const handleCurrentTempClick = (event) => {
    displayLandscape();
    temperatureColor();
    findLatitudeAndLongitude(state.cityNameInput.value);
};

const handleIncreaseTempClick = (event) => {
    // When clicking on the increase temp button, the temp value should increase by 1
    state.tempCount += 1;
    state.tempValue.textContent = state.tempCount;
    temperatureColor();
};

const handleDecreaseTempClick = (event) => {
    // When clicking on the decrease temp button, the temp value should decrease by 1
    state.tempCount -= 1;
    state.tempValue.textContent = state.tempCount;
    temperatureColor();
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
        state.skyDiv.textContent = "☀️☀️☀️☀️☀️☀️";
    } else if (state.skySelection.value === "cloudy") {
        state.skyDiv.textContent = "☁️☁️⛅☁️☁️☁️";
    } else if (state.skySelection.value === "rainy") {
        state.skyDiv.textContent = "☁️☔️☁️☁️☔️☁️";
    } else if (state.skySelection.value === "snowy") {
        state.skyDiv.textContent = "☁️❄️☁️❄️☁️❄️";
    }
};

const changeCity = (event) => {
    const value = state.cityNameInput.value;
    state.cityNameHeader.textContent = value;
};

const resetCityName = (event) => {
    state.cityNameInput.value = "";
    state.cityNameHeader.textContent = "";
};

const findLatitudeAndLongitude = (cityName) => {
    axios.get('http://127.0.0.1:5000/location',
    { 
    params: {
        q: cityName
    }
    })
    .then( (response) => {
        console.log(response.data)
        const latitude = response.data[0].lat;
        const longtitude = response.data[0].lon;
        
        getWeather(latitude,longtitude)
        
    })
    .catch( (error) => {
        console.log(error)
})};

const getWeather = (latitude, longitude) => {
    axios.get('http://127.0.0.1:5000/weather',
    {
    params:{
        lat: latitude,
        lon: longitude,
    }
    })
    .then( (response) => {
        console.log('success!',response.data.main.temp);
        const currentTempKelvin = response.data.main.temp
        updateWeather(currentTempKelvin);
    })
    .catch ( (error) => {
        console.log('error in getWeather', error);
    })}

const updateWeather = (temp) => {
    const currentTempFahrenheit = parseInt((temp - 273.15) * (9 / 5) + 32, 10);
    state.tempCount = currentTempFahrenheit
    state.tempValue.textContent = state.tempCount;
}

const onLoad = () => {
    // do what we need to do when the page loads
    loadControls();
    registerEvents();
};

document.addEventListener("DOMContentLoaded", onLoad);