import React from 'react';
import styled from 'styled-components';
import { fetchWeatherData, extractNeededWeatherData } from '../utils/api';
import useData from './useData';

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
  const { state, dispatch, loading } = useData();

  React.useEffect(() => {
    (async () => {
      try {
        const weatherData = await fetchWeatherData();
        const weatherInfo = await extractNeededWeatherData(weatherData);
        dispatch({ type: 'Success', data: weatherInfo });
      } catch (error) {
        console.warn(error);
        dispatch({ type: 'Error', error: 'There was an error' });
      }
    })();
    return () => dispatch({ type: 'Reset' });
  }, []);

  const { data: weather } = state;

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <HomeDiv>
        <HomeTitle>
          <h1>The Forecast</h1>
          <div>
            <pre>{JSON.stringify(weather, null, 2)}</pre>
          </div>
        </HomeTitle>
      </HomeDiv>
    );
  }
}
