var apiKey = "478c8445f9e397e72536c0f2ca45be45";
var searchBtn = document.getElementById("search");
var resultsContainer = document.getElementById("resultsContainer");
var currentWeatherContainer = document.getElementById(
  "currentWeatherContainer"
);
var forecastContainer = document.getElementById("forecastContainer");
// find city function
function findCity(event) {
  event.preventDefault();
  var city = document.getElementById("cityInput").value;
  localStorage.setItem("city", city);
  console.log("successful");
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((currentData) => {
      displayCurrentWeather(currentData);
      fetch(forecastUrl)
        .then((response) => response.json())
        .then((forecastData) => {
          displayForecast(forecastData);
          console.log(forecastData);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayCurrentWeather(currentData) {
  currentWeatherContainer.innerHTML = "";
  var city = currentData.name;
  var date = dayjs().format("MM/DD/YYYY");
  var iconCode = currentData.weather[0].icon;
  var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
  var temperature = currentData.main.temp;
  var humidity = currentData.main.humidity;
  var windSpeed = currentData.wind.speed;

  var currentWeather = document.createElement("div");
  currentWeather.innerHTML = `
        <h2>${city} (${date}) <img src="${iconUrl}" alt="Weather Icon"></h2>
        <p>Temperature: ${temperature} °F</p>
        <p>Humidity: ${humidity} %</p>
        <p>Wind Speed: ${windSpeed} MPH</p>
      `;
  currentWeatherContainer.appendChild(currentWeather);
}

function displayForecast(forecastData) {
  forecastContainer.innerHTML = "";
  var forecastList = forecastData.list;
  for (var i = 0; i < forecastList.length; i += 8) {
    var forecastItem = forecastList[i];
    var date = dayjs(forecastItem.dt_txt).format("MM/DD/YYYY");
    var iconCode = forecastItem.weather[0].icon;
    var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    var temperature = forecastItem.main.temp;
    var humidity = forecastItem.main.humidity;
    var windSpeed = forecastItem.wind.speed;

    var forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    forecastCard.innerHTML = `
          <h3>${date}</h3>
          <img src="${iconUrl}" alt="Weather Icon">
          <p>Temperature: ${temperature} °F</p>
          <p>Humidity: ${humidity} %</p>
          <p>Wind Speed: ${windSpeed} MPH</p>
        `;
    forecastContainer.appendChild(forecastCard);
  }
}

searchBtn.addEventListener("click", findCity);
