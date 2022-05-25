// Searching Date & Time
function getDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDateTime = document.querySelector("#current-date");
  currentDateTime.innerHTML = `${day} ${hours}:${minutes}`;
}
getDate();

// Searching City & Temperature

function getTemp(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#large-temp-label").innerHTML = Math.round(
    response.data.main.temp
  );
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-location-search").value;
  search(city);
}

function search(city) {
  let apiKey = "2f28b522273e5a44fff5d07515e6c17f";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getTemp);
}

let form = document.querySelector("#enter-location-form");
form.addEventListener("click", handleSearch);

// Display Current City & Temperature
function getTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#large-temp-label");
  h1.innerHTML = temp;
  let city = response.data.name;
  let h2 = document.querySelector("#current-city");
  h2.innerHTML = city;
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2f28b522273e5a44fff5d07515e6c17f";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getTemperature);
}

function getCurrentLocationInfo() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocation = document.querySelector("#current-location-input");
currentLocation.addEventListener("click", getCurrentLocationInfo);
