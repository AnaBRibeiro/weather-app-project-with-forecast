function displayDayAndTime(timestamp) {
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

function displayData(response) {
  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.innerHTML = response.data.name;

  let dayAndTimeElement = document.querySelector("#day-and-time");
  dayAndTimeElement.innerHTML = displayDayAndTime(response.data.dt * 1000);

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

  celsiusTemperature = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector("#value-temperature");
  temperatureElement.innerHTML = celsiusTemperature;

  displayCelsiusTemperature();
}

function makeApiCall(city) {
  let apiKey = `6e2e6ba4445c2a3f7c96186354d36ba3`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${unit}`;
  axios.get(apiUrl).then(displayData);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#input-city");
  let typedCity = cityInputElement.value;
  makeApiCall(typedCity);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#value-temperature");
  fahreinheitLinkElement.classList.remove("unit-conversion-link-fahreinheit");
  fahreinheitLinkElement.classList.add("unit-conversion-link-celsius");
  celsiusLinkElement.classList.remove("unit-conversion-link-celsius");
  celsiusLinkElement.classList.add("unit-conversion-link-fahreinheit");
  let fahreinheitTemperature = Math.round(celsiusTemperature * 1.8 + 32);
  temperatureElement.innerHTML = fahreinheitTemperature;
}

function displayCelsiusTemperature() {
  let temperatureElement = document.querySelector("#value-temperature");
  celsiusLinkElement.classList.remove("unit-conversion-link-fahreinheit");
  celsiusLinkElement.classList.add("unit-conversion-link-celsius");
  fahreinheitLinkElement.classList.remove("unit-conversion-link-celsius");
  fahreinheitLinkElement.classList.add("unit-conversion-link-fahreinheit");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit);

let fahreinheitLinkElement = document.querySelector("#fahreinheit-link");
fahreinheitLinkElement.addEventListener("click", displayFahrenheitTemperature);

let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLinkElement.addEventListener("click", displayCelsiusTemperature);

makeApiCall(`New York`);
