import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../app/components/Home';

import './index.css';

function WeatherApp() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

ReactDOM.render(<WeatherApp />, document.getElementById('app'));

module.hot.accept();
