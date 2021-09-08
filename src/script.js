function getForecast(coordinates) {
	let apiKey = "acfd78e73c052df652b44124ce0e5d1e";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
	celsiusTemperature = response.data.main.temp;
	//Sets actual city
	document.querySelector("#actual-city").innerHTML = response.data.name;
	//Sets actual temperature
	document.querySelector("#main-temp").innerHTML = `${Math.round(
		celsiusTemperature
	)}°C`;
	//Sets sky condition
	document.querySelector("#actual-weather").innerHTML =
		response.data.weather[0].description;

	//Sets real feel temperature
	document.querySelector("#actual-feel").innerHTML = `Real-Feel: ${Math.round(
		response.data.main.feels_like
	)}°C`;
	//Sets actual wind speed
	document.querySelector("#actual-wind").innerHTML = `Wind: ${Math.round(
		response.data.wind.speed * 3,
		6
	)} km/h`;
	//Sets actual humidity %
	document.querySelector(
		"#actual-humidity"
	).innerHTML = `Humidity: ${response.data.main.humidity}%`;

	//Changes the icon
	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);
	getForecast(response.data.coord);
}

//Sends city data to displayWeather
function searchCity(city) {
	let apiKey = "acfd78e73c052df652b44124ce0e5d1e";
	let units = "metric";
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

	axios.get(url).then(displayWeather);
}

function handleSubmit(event) {
	event.preventDefault();
	let city = document.querySelector("#input-city").value;
	searchCity(city);
}

//Sends city name to changeCity
let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

//creates the url that gets sent to displayWeather
function showPosition(position) {
	let apiKey = "acfd78e73c052df652b44124ce0e5d1e";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeather);
}
//Requests the geolocation and sends it to showPosition
function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showPosition);
}
//Sends a request to getCurrentPosition when the button is clicked
let currentButton = document.querySelector("#localize-button");
currentButton.addEventListener("click", getCurrentLocation);
//Gets current time and formats it
let now = new Date();
let hours = now.getHours();

let minutes = now.getMinutes();

let minutesFormatted = ("0" + minutes).slice(-2);
//Gets the current date and formats it
let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
//Injects the current date and time in the html
let day = days[now.getDay()];

let actualDate = document.querySelector("#actual-date");
actualDate.innerHTML = `${day} ${hours}:${minutesFormatted}`;

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");
	let forecastHTML = `<div class="row">`;

	forecast.forEach(function (forecastDay, index) {
		if (index > 0 && index < 7) {
			forecastHTML =
				forecastHTML +
				`<div class="col-2">
								<div class="weather-forecast-date"><h6 class="forecast-day">${formatDay(
									forecastDay.dt
								)}</h6></div>
								<img src = "http://openweathermap.org/img/wn/${
									forecastDay.weather[0].icon
								}@2x.png" alt ="" width="42"
								/>
								<br />

								<div class="weather-forecast-temperatures">
									<span class="weather-forecast-temperature-max"> ${Math.round(
										forecastDay.temp.max
									)}°C |</span>
									<span class="weather-forecast-temperature-min"> ${Math.round(
										forecastDay.temp.min
									)}°C</span>
								</div>
							</div>`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
	console.log(forecastHTML);
}

function displayWeatherMetric(response) {
	document.querySelector("#main-temp").innerHTML = `${Math.round(
		response.data.main.temp
	)}°C`;
}
function searchCityMetric() {
	let apiKey = "acfd78e73c052df652b44124ce0e5d1e";
	let city = document.querySelector("#actual-city").innerHTML;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeatherMetric);
}

let celsiusTemperature = null;

searchCity("New York");
