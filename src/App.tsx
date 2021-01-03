import * as React from 'react';
import './App.css';
import { Clock } from './components/clock/Clock';

import 'bootstrap/dist/css/bootstrap.min.css'
import { WeatherSummary } from './components/weather/WeatherSummary';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="col-4">
            <Clock />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <WeatherSummary name="Ursvik" lon={0} lat={0} msl={0}/>
          </div>
          <div className="col-4">
            <WeatherSummary name="Visby" lon={0} lat={0} msl={0}/>
          </div>
          <div className="col-4">
            <WeatherSummary name="Vängsö" lon={0} lat={0} msl={0}/>
          </div>
        </div>
      </div>
    );
  }
}
