import * as React from 'react';
import './App.css';
import { Clock } from './components/clock/Clock';

import 'bootstrap/dist/css/bootstrap.min.css'

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

          </div>
          <div className="col-4">
            
          </div>
          <div className="col-4">
            
          </div>
        </div>
      </div>
    );
  }
}
