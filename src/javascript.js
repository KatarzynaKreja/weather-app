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
  console.log(response.data);
  let city = response.data.name;

  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#description");
  let weather = response.data.weather[0].description;
  tempElement.innerHTML = temp;
  descriptionElement.innerHTML = weather;
  let cityElem = document.querySelector("h1");
  cityElem.innerHTML = city;
}

function showCurrentWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

searchCity("Catania");
