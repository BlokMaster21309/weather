// Get elements we need for our action
const zipInput = document.querySelector("#zip-code");
const statusElement = document.querySelector("#status");
const weatherSection = document.querySelector("#weather");
const rawDataElement = document.querySelector("#raw-data");
const weatherSummaryElement = document.querySelector('#weather-summary');

// Get our buttons that trigger stuff...
const zipButton = document.querySelector("#get-zip-button");
const hourlyButton = document.querySelector("#get-hourly-button")
const forecastButton = document.querySelector("#get-forecast-button");

// Define the variables we need...
let thePlace; // where the forecast is for
let weatherData; // weather data
let forecastUrl; // where to get the forecast
let hourlyForecastUrl; // where to get the hourly forecast

zipButton.addEventListener(
  // When the user clicks the zip button
  "click",
  // Do this...
  async function () {
    // Get the zip code from the zip input
    const zipCode = zipInput.value.trim();

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
      const zipCodeResponse = await fetch(`https://api.zippopotam.us/us/${zipCode}`)
      const zipCodeJson = await zipCodeResponse.json();
      console.log('Got zipCode response', zipCodeJson);
      thePlace = zipCodeJson.places[0]; // read the first place from the response
    } catch (error) {
      console.error(error);
      statusElement.textContent = `Error getting zip code: ${error}`
      return; // Give up, we failed!
    }
    // Request 2: ask NWS which grid and forecast URLs serve those coordinates.
    try {
      const response = await fetch(`https://api.weather.gov/points/${thePlace.latitude},${thePlace.longitude}`);
      const data = await response.json();
      console.log('Got response from weather.gov: ', data);
      forecastUrl = data.properties.forecast;
      hourlyForecastUrl = data.properties.forecastHourly;     
    } catch (error) {
      console.error('Error fetching weather.gov', error);
      statusElement.textContent = `Error getting weather data: ${error}`

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
  }
);

forecastButton.addEventListener(
  // When the forecast button is clicked...
  "click", async function () {
    try {
      const response = await fetch(forecastUrl);
      const data = await response.json();
      rawDataElement.textContent = JSON.stringify(data, null, 2);
      let summary = '';
      // For the first 5 weather periods...
      for (let p of data.properties.periods.slice(0, 5)) {
        console.log('period: ', p);
        // Add to summary: name/shortForecast        
        summary += `<br>${p.name}: ${p.shortForecast}\n`;
      }
      weatherSummaryElement.innerHTML = summary;
      
    } catch (error) {
      console.error('Error fetching daily forecast: ', error)      
      statusElement.textContent = `Error fetching daily forecast: ${error}`      
    }
  }
);

hourlyButton.addEventListener(
  // When the hourly button is clicked
  "click", async function () {
    try {
      const response = await fetch(hourlyForecastUrl);
      const data = await response.json();
      rawDataElement.textContent = JSON.stringify(data, null, 2);
      let periods = data.properties.periods;
      let summary = '';
      // For the first 8 weather periods...
      for (let p of periods.slice(0, 8)) {
        // build a little summary string (\n creates a new line...)        
        console.log('period: ', p);
        let timeString = new Date(p.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        summary += `<br>${timeString} - ${p.shortForecast}`
      }
      weatherSummaryElement.innerHTML = summary;      
    } catch (error) {
      console.error('Error fetching hourly forecast: ', error)
      statusElement.textContent = `Error fetching hourly forecast: ${error}`
    }
  }
)



