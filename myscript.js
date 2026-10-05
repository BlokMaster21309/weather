/** This one codeblock by Gemini
 * Wraps navigator.geolocation.getCurrentPosition in a Promise.
 * @param {Object} [options] - Optional Geolocation settings (e.g. enableHighAccuracy)
 * @returns {Promise<GeolocationPosition>}
 */
const getCurrentPositionPromise = (options) => {
	return new Promise((resolve, reject) => {
		// Check if geolocation is supported by the browser
		if (!navigator.geolocation) {
			return reject(new Error("Geolocation is not supported by this browser."));
		}
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
};

// Get elements we need for our action
const zipInput = document.getElementById("zip-code");
const statusElement = document.getElementById("status");
const weatherSection = document.getElementById("weather");
const rawDataElement = document.getElementById("raw-data");
const weatherSummaryElement = document.getElementById("weather-summary");
const weatherTable = document.getElementById("weather-table");

const getZipGroup = document.getElementById("get-zip-group");
const getForecastGroup = document.getElementById("get-forecast-group");
const loadingIndicator = document.getElementById("loading-indicator");

const timescale = localStorage.getItem("timescale")
const hourFormat = localStorage.getItem("hour") || "h12";
const prefillLocation = (new URLSearchParams(window.location.search)).get('zip-code') || localStorage.getItem("zip")

// Get our buttons that trigger stuff...
const zipButton = document.getElementById("get-zip-button");
const locationButton = document.getElementById("get-location-button");
const hourlyButton = document.getElementById("get-hourly-button");
const forecastButton = document.getElementById("get-forecast-button");

// Define the variables we need...
let thePlace; // where the forecast is for
let weatherData; // weather data
let forecastUrl; // where to get the forecast
let hourlyForecastUrl; // where to get the hourly forecast
let position; //location for geolocation

document.addEventListener("DOMContentLoaded", locationAuto());

async function locationAuto() {
	loadingIndicator.hidden = false;
	// Reset the variables and disable the buttons until we know we have a forecast
	thePlace = undefined;
	forecastUrl = undefined;
	hourlyForecastUrl = undefined;
	forecastButton.disabled = true;
	hourlyButton.disabled = true;
	weatherSummaryElement.textContent = "";
	rawDataElement.textContent = "";

	if (prefillLocation) {
		await locationZip();
	}
	else
		if ((await geolocate()) === true) {
			await weatherlocate();
		}
	if (timescale === "hourly") {
		hourlyForecast();
	};
	if (timescale === "doubleDaily") {
		dailyForecast();
	};
	loadingIndicator.hidden = true;
}

async function geolocate() {
	try {
		console.log("locationAuto: querying navigator.geolocation");
		const options = {
			enableHighAccuracy: true, // Request more precise coordinates
			timeout: 5000, // Time out after 5 seconds
			maximumAge: 0, // Do not use a cached position
		};

		position = await getCurrentPositionPromise(options);

		console.log(
			`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude} (Accurate to ${position.coords.accuracy} meters)`,
		);
		getZipGroup.hidden = true;
		return true; // true means success
	} catch (error) {
		console.error("Error getting location:", error.message);
		getZipGroup.hidden = false;
		return false; // false means failure
	}
}

async function weatherlocate() {
	try {
		console.log("locationAuto: querying weather.gov");
		const response = await fetch(
			`https://api.weather.gov/points/${position.coords.latitude},${position.coords.longitude}`,
		);
		const data = await response.json();
		console.log("Got response from weather.gov: ", data);
		forecastUrl = data.properties.forecast;
		hourlyForecastUrl = data.properties.forecastHourly;
	} catch (error) {
		console.error("Error fetching weather.gov", error);
		statusElement.textContent = `Error getting weather data: ${error}`;
		getZipGroup.hidden = false;
	}
	// Activate the buttons if we found a URL for the forecast
	if (forecastUrl) {
		forecastButton.disabled = false;
	} else {
		forecastButton.disabled = true;
	}
	if (hourlyForecastUrl) {
		hourlyButton.disabled = false;
	} else {
		hourlyButton.disabled = true;
	}
	loadingIndicator.hidden = true;
}

async function locationZip() {
	loadingIndicator.hidden = false;
	// Get the zip code from the zip input
	const zipCode = zipInput.value.trim() || prefillLocation

	// Reset the variables and disable the buttons until we know we have a forecast
	thePlace = undefined;
	forecastUrl = undefined;
	hourlyForecastUrl = undefined;
	forecastButton.disabled = true;
	hourlyButton.disabled = true;
	weatherSummaryElement.textContent = "";
	rawDataElement.textContent = "";

	// Attempt to load location data from zip code
	try {
		// Request 1: translate a human-friendly ZIP code into coordinates.
		const zipCodeResponse = await fetch(
			`https://api.zippopotam.us/us/${zipCode}`,
		);
		const zipCodeJson = await zipCodeResponse.json();
		console.log("Got zipCode response", zipCodeJson);
		thePlace = zipCodeJson.places[0]; // read the first place from the response
	} catch (error) {
		console.error(error);
		statusElement.textContent = `Error getting zip code: ${error}`;
		loadingIndicator.hidden = true;
		return; // Give up, we failed!
	}
	// Request 2: ask NWS which grid and forecast URLs serve those coordinates.
	try {
		const response = await fetch(
			`https://api.weather.gov/points/${thePlace.latitude},${thePlace.longitude}`,
		);
		const data = await response.json();
		console.log("Got response from weather.gov: ", data);
		forecastUrl = data.properties.forecast;
		hourlyForecastUrl = data.properties.forecastHourly;
	} catch (error) {
		console.error("Error fetching weather.gov", error);
		statusElement.textContent = `Error getting weather data: ${error}`;
	}
	// Activate the buttons if we found a URL for the forecast
	if (forecastUrl) {
		forecastButton.disabled = false;
	} else {
		forecastButton.disabled = true;
	}
	if (hourlyForecastUrl) {
		hourlyButton.disabled = false;
	} else {
		hourlyButton.disabled = true;
	}
	loadingIndicator.hidden = true;
}

async function dailyForecast() {
	loadingIndicator.hidden = false;
	try {
		const response = await fetch(forecastUrl);
		const data = await response.json();
		rawDataElement.textContent = JSON.stringify(data, null, 2);
		let summary = "";
		// For the first 5 weather periods...
		for (let p of data.properties.periods.slice(0, 1000)) {
			console.log("period: ", p);
			// Add to summary: name/shortForecast
			summary += `<br>${p.name}: ${p.shortForecast}\n`;
		}
		weatherSummaryElement.innerHTML = summary;
	} catch (error) {
		console.error("Error fetching daily forecast: ", error);
		statusElement.textContent = `Error fetching daily forecast: ${error}`;
	}
	getForecastGroup.hidden = true;
	loadingIndicator.hidden = true;
}

async function hourlyForecast() {
	loadingIndicator.hidden = false;
	try {
		const response = await fetch(hourlyForecastUrl);
		const data = await response.json();
		rawDataElement.textContent = JSON.stringify(data, null, 2);
		let periods = data.properties.periods;
		let summary = "";
		// For the first 8 weather periods...
		for (let p of periods.slice(0, 1000)) {
			// build a little summary string (\n creates a new line...)
			console.log("period: ", p);
			let timeString = new Date(p.startTime).toLocaleTimeString([], {
				hour: "numeric",
				hourCycle: hourFormat,
			});
			summary += `<br>${timeString} - ${p.shortForecast}`;
		}
		weatherSummaryElement.innerHTML = summary;
	} catch (error) {
		console.error("Error fetching hourly forecast: ", error);
		statusElement.textContent = `Error fetching hourly forecast: ${error}`;
	}
	getForecastGroup.hidden = true;
	loadingIndicator.hidden = true;
}

function unhide() {
	getZipGroup.hidden = false;
	getForecastGroup.hidden = true;
}