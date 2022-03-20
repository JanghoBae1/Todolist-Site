const tem = document.querySelector(".js-temp");
const pla = document.querySelector(".js-place");
const API_KEY = "fc0b2306dd193e2fdd0dc425b3018d2e";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperture = json.main.temp;
      const place = json.name;
      tem.innerText = `${temperture}°`;
      pla.innerText = place;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function successPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, latitude);
}

function failPosition(position) {
  console.log("fail location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(successPosition, failPosition);
}

function loadCoords() {
  const loadCoords = localStorage.getItem(COORDS);
  if (loadCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
