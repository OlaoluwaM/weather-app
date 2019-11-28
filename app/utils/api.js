'use strict';
import { formatDate } from './helpers';

const API_KEY_Weather = '9146f7cd797de4f5a9ac4634782421a0';
const GOOGLE_API_KEY = 'AIzaSyAkxRvn8s8zLZprAi7WBZOwd6BGwo9Ls2o';

async function getUserLocation() {
  const response = await fetch('http://ip-api.com/json');
  const locationData = await response.json();
  const { lat, lon } = locationData;
  return { lat, lon };
}

export async function fetchCurrentWeatherData() {
  const { lat, lon } = await getUserLocation();
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_Weather}&units=metric`
  );
  const weatherInfo = await response.json();
  return extractNeededCurrentWeatherData(weatherInfo);
}

export async function fetchHourlyWeatherData() {
  const { city, country } = await getUserLocation();
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${API_KEY_Weather}&units=metric&cnt=12`
  );
  const weatherInfo = await response.json();
  return extractNeededHourlyWeatherData(weatherInfo);
}

export function fetchWeatherIcon(icon) {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

/**
 *
 * @param {{}} data
 * @returns {{}}
 */
function extractNeededHourlyWeatherData(data) {
  const { id: cityID, name: cityName } = data.city;
  const dataArray = data.list.map(
    ({ dt: forecastTime, dt_txt: timeOfCalc, main, weather: weatherData }) => ({
      forcastTime: formatDate(forecastTime),
      timeOfCalc,
      temp: main.temp,
      minTemp: main.temp_min,
      maxTemp: main.temp_max,
      weatherData,
    })
  );
  return {
    cityID,
    cityName,
    ...dataArray,
  };
}

/**
 *
 * @param {{}} data
 * @returns {{}}
 */

function extractNeededCurrentWeatherData(data) {
  const { name: cityName, weather: weatherInfo, sys, dt: timeOfCalc } = data;
  const { temp, temp_min: minTemp, temp_max: maxTemp } = data.main;
  const { country: countryCode } = sys;
  return {
    cityName,
    weatherInfo: weatherInfo[0],
    countryCode,
    timeOfCalc: formatDate(timeOfCalc),
    temp,
    minTemp,
    maxTemp,
  };
}
