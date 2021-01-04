import * as React from 'react';
import './App.css';
import { Clock } from './components/clock/Clock';

import 'bootstrap/dist/css/bootstrap.min.css'
import { WeatherSummaries } from './components/weather/WeatherSummaries';
import { SLNextDepartures } from './components/public-transport/SLNextDepartures';

export default class App extends React.Component {
  render() {
    return (
      <div className="app bg-dark">
        <div className="row">
          <div className="col-4">
            <Clock />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <WeatherSummaries />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <SLNextDepartures stopName="Ursviks Holme" />
          </div>
          <div className="col-6">
            {/* Disturbances or news */}
          </div>
        </div>
      </div>
    );
  }
}
