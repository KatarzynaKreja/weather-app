function formatDate(timestamp) {
  let date = new Date(timestamp);
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
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let now = document.querySelector("#date");

  now.innerHTML = `Last updated at ${day}, ${hour}:${minute}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

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

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayWeather);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h5>
        ${formatHours(forecast.dt * 1000)}
      </h5>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>/
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

function displayWeather(response) {
  let city = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let tempElement = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#description");
  let weather = response.data.weather[0].description;
  let cityElem = document.querySelector("h1");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconSpace = document.querySelector("#icon");
  iconSpace.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconSpace.setAttribute("alt", `${weather}`);
  tempElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = weather;
  cityElem.innerHTML = city;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)} %`;
  formatDate(response.data.dt * 1000);

  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayForecast);
}

function showCurrentWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let apiKey = `f77cad6d452d84a939c49b6eacf724ee`;
searchCity("Catania");
