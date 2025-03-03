const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');
const tempToggle = document.getElementById('temp-toggle');
const themeToggle = document.getElementById('theme-toggle');

let isCelsius = true;
let apiKey = "8a591d5886109147c80cd93eb754ba36";

async function checkWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod === "404") {
            locationNotFound.style.display = "flex";
            weatherBody.style.display = "none";
            return;
        }

        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";

        let tempCelsius = Math.round(weatherData.main.temp - 273.15);
        let tempFahrenheit = Math.round((tempCelsius * 9/5) + 32);

        temperature.dataset.celsius = tempCelsius;
        temperature.dataset.fahrenheit = tempFahrenheit;
        temperature.innerHTML = `${isCelsius ? tempCelsius : tempFahrenheit}°${isCelsius ? "C" : "F"}`;

        description.innerHTML = weatherData.weather[0].description;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;

        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weatherImg.src = "cloud.png";
                break;
            case 'Clear':
                weatherImg.src = "clear.png";
                break;
            case 'Rain':
                weatherImg.src = "rain.png";
                break;
            case 'Mist':
                weatherImg.src = "mist.png";
                break;
            case 'Snow':
                weatherImg.src = "snow.png";
                break;
            default:
                weatherImg.src = "default.png";
        }

    } catch (error) {
        console.error("Error fetching weather data", error);
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

tempToggle.addEventListener('click', () => {
    isCelsius = !isCelsius;
    let tempValue = isCelsius ? temperature.dataset.celsius : temperature.dataset.fahrenheit;
    temperature.innerHTML = `${tempValue}°${isCelsius ? "C" : "F"}`;
    tempToggle.innerText = isCelsius ? "°F" : "°C";
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.innerText = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
});
