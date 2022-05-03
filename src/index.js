function getCurrentDayAndTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function getForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return day;
}

function displayForecastData(response) {
  let weatherForecastDay = response.data.daily;
  let weatherForecastElement = document.querySelector("#weather-forecast");
  let weatherForecastHTML = `<div class="row">`;
  weatherForecastDay.forEach(function (forecastDay, index) {
    if (index < 5) {
      weatherForecastHTML =
        weatherForecastHTML +
        `<div class="col-2">
                <div class="day">${getForecastDay(forecastDay.dt)}</div>
                <div class="weather-forecast-icon">
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""/>
                </div>
                <div>
                  <span class="value-temperature-forecast-max">${Math.round(
                    forecastDay.temp.max
                  )}º</span>
                  <span class="value-temperature-forecast-min">${Math.round(
                    forecastDay.temp.min
                  )}º</span>
                </div>
              </div>`;
    }
  });
  weatherForecastHTML = weatherForecastHTML + `</div>`;
  weatherForecastElement.innerHTML = weatherForecastHTML;
}

function makeApiCallKnowingCoordenates(coordinates) {
  apiKey = `6e2e6ba4445c2a3f7c96186354d36ba3`;
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let unit = `metric`;
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=${unit}`;
  axios.get(apiUrl).then(displayForecastData);
}

function displayCurrentData(response) {
  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.innerHTML = response.data.name;

  let dayAndTimeElement = document.querySelector("#day-and-time");
  dayAndTimeElement.innerHTML = getCurrentDayAndTime(response.data.dt * 1000);

  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;

  let weatherHumidityElement = document.querySelector(
    "#value-weather-humidity"
  );
  weatherHumidityElement.innerHTML = Math.round(response.data.main.humidity);

  let weatherWindSpeedElement = document.querySelector(
    "#value-weather-wind-speed"
  );
  weatherWindSpeedElement.innerHTML = Math.round(response.data.wind.speed);

  let weatherIcon = response.data.weather[0].icon;
  let weatherIconDescription = response.data.weather[0].description;
  let weatherIconElement = document.querySelector("#weather-icon");
  weatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", weatherIconDescription);

  let temperatureElement = document.querySelector("#value-temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  makeApiCallKnowingCoordenates(response.data.coord);
}

function makeApiCallKnowingCity(city) {
  let apiKey = `6e2e6ba4445c2a3f7c96186354d36ba3`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${unit}`;
  axios.get(apiUrl).then(displayCurrentData);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#input-city");
  let typedCity = cityInputElement.value;
  makeApiCallKnowingCity(typedCity);
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit);

makeApiCallKnowingCity(`New York`);
