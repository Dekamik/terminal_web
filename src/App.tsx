import * as React from 'react';
import './App.css';
import { Clock } from './components/clock/Clock';

import 'bootstrap/dist/css/bootstrap.min.css'
import { WeatherSummaries } from './components/weather/WeatherSummaries';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="col-4">
            <Clock />
          </div>
        </div>
        <WeatherSummaries />
        <div className="row">
          <div className="col-4">
            {/* Bus departures */}
          </div>
          <div className="col-8">
            {/* Disturbances or news */}
          </div>
        </div>
      </div>
    );
  }
}
