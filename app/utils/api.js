'use strict';

const API_KEY_Weather = '9146f7cd797de4f5a9ac4634782421a0';

async function getUserLocation() {
  const response = await fetch('http://ip-api.com/json');
  const locationData = await response.json();
  const { city, countryCode: country } = locationData;
  return { city, country };
}

export async function fetchWeatherData() {
  const { city, country } = await getUserLocation();
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${API_KEY_Weather}&units=metric&cnt=5`
  );
  const weatherInfo = await response.json();
  return weatherInfo;
}

/**
 *
 * @param {{}} data
 * @returns {{}}
 */
export function extractNeededWeatherData(data) {
  const { id: cityID, name: cityName } = data.city;
  const dataArray = data.list.map(
    ({
      dt: forecastTime,
      dt_txt: timeOfCalc,
      main,
      weather: weatherData,
      rain: rainInfo,
    }) => ({
      forecastTime,
      timeOfCalc,
      temp: main.temp,
      weatherData,
      rainInfo,
    })
  );
  return {
    cityID,
    cityName,
    ...dataArray,
  };
}
