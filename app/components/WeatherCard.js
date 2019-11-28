import React from 'react';
import {
  fetchCurrentWeatherData,
  fetchHourlyWeatherData,
  fetchWeatherIcon,
} from '../utils/api';
import useData from './useData';
import styled from 'styled-components';

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const CardContainer = styled.div.attrs({
  className: 'sunset',
})`
  display: flex;
  border: 10px double #000;
  border-radius: 20px;
  box-shadow: -5px 3px 1px 10px rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  flex-basis: 40%;
  width: 40%;
  height: 75%;
  flex-direction: column;
`;

const CardTitle = styled.h1`
  font-family: var(--font1);
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 20px;
`;

const CardSubtitle = styled.h3`
  font-family: var(--font2);
  text-align: center;
  font-size: 0.9rem;
  margin-top: 5px;
  opacity: 0.4;
`;

const WeatherIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin: 20px 0px 40px 0px;
  img {
    height: 100%;
    transform: scale(0.8);
  }
  h2 {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 5rem;
    font-family: var(--font2);
    margin: 0;
  }
`;

const TempRange = styled.span`
  font-size: 1.3rem;
  font-family: var(--font2);
  opacity: 0.6;
`;

const WeatherInfo = styled.h3`
  font-family: var(--font2);
  font-size: 2rem;
  text-transform: capitalize;
  font-weight: 400;
  margin-top: 35px;
`;

export default function CurrentWeatherCard() {
  const { state, dispatch, loading } = useData();

  React.useEffect(() => {
    (async () => {
      try {
        const currentWeatherInfo = await fetchCurrentWeatherData();
        dispatch({ type: 'Success', data: currentWeatherInfo });
      } catch (error) {
        console.error(error);
        dispatch({ type: 'Error' });
      }
    })();
    return () => dispatch({ type: 'Reset' });
  }, []);

  const { data: weather, error } = state;
  return (
    <CenterContainer>
      {!loading && error && <p>Error</p>}
      {loading && <h2>Loading</h2>}
      {!loading && !error && (
        <CardContainer>
          <CardTitle>{`${weather.cityName}, ${weather.countryCode}`}</CardTitle>
          <CardSubtitle>{weather.timeOfCalc}</CardSubtitle>
          <WeatherIconContainer>
            <img
              src={fetchWeatherIcon(weather.weatherInfo.icon)}
              alt={weather.weatherInfo.main}
            />
            <h2>{weather.temp}</h2>
          </WeatherIconContainer>
          <TempRange>{`${weather.minTemp} | ${weather.maxTemp}`}</TempRange>
          <WeatherInfo>{weather.weatherInfo.description}</WeatherInfo>
        </CardContainer>
      )}
    </CenterContainer>
  );
}
