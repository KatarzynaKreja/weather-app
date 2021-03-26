let date = new Date();

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
let hour = date.getHours();
if (hour < 10) {
  hour = `0 ${hour}`;
}
let minute = date.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let now = document.querySelector("#date");

now.innerHTML = `Last updated at ${day}, ${hour}:${minute}`;

function searchCity(city) {
  let apiKey = "f77cad6d452d84a939c49b6eacf724ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function changeCityWeather(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-input");
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = `${newCity.value}`;
  let apiKey = "f77cad6d452d84a939c49b6eacf724ee";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCityWeather);

let currentWeatherButton = document.querySelector("#current");
currentWeatherButton.addEventListener("click", showCurrentWeather);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `f77cad6d452d84a939c49b6eacf724ee`;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayWeather);
}
function displayWeather(response) {
  let city = response.data.name;
  celsiusTemperature = response.data.main.temp;
  console.log(response);
  let tempElement = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#description");
  let weather = response.data.weather[0].description;
  tempElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = weather;
  let cityElem = document.querySelector("h1");
  cityElem.innerHTML = city;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)} %`;
  let iconSpace = document.querySelector("#icon");
  iconSpace.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconSpace.setAttribute("alt", `${weather}`);
}

function showCurrentWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

debugger;
let celsiusTemperature = null;

let celsiusLink = document.querySelector("#cel-temp-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahreinheitLink = document.querySelector("link");
fahreinheitLink.addEventListener("click", displayFahrenheitTemperature);

searchCity("Catania");
