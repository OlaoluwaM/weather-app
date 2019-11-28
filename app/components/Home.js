import React from 'react';
import styled from 'styled-components';
import CurrentWeatherCard from './WeatherCard';

const HomeTitle = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;

  h1 {
    font-family: var(--font1);
    margin: 0px 0px 50px 0px;
    text-align: left;
    font-size: 6rem;
    font-weight: 100;
  }
`;

const HomeDiv = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`;

export default function Home() {
  return <CurrentWeatherCard />;
}
