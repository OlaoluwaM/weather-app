import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function WeatherApp() {
  return <div>What's the weather like</div>;
}

ReactDOM.render(<WeatherApp />, document.getElementById('app'));

module.hot.accept();
