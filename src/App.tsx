import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Home } from './components/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Clock } from './components/clock/Clock';
import { Navbar } from './components/navbar/Navbar';
import { SL_TRAVEL_PLANNER, HOME, SETTINGS, TODO } from './routes/WebRoutes';
import { Settings } from './components/Settings';
import { SLTravelPlanner } from './components/SLTravelPlanner';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app bg-dark">
          <div className="row">
              <div className="col-4">
                  <Clock />
              </div>
              <div className="col-5">
                {/* Alerts */}
              </div>
              <div className="col-3">
                  <Navbar />
              </div>
          </div>

          <Switch>
            <Route exact path={HOME}>
              <Home />
            </Route>
            <Route path={SL_TRAVEL_PLANNER}>
              <SLTravelPlanner />
            </Route>
            <Route path={TODO}>

            </Route>
            <Route path={SETTINGS}>
              <Settings />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
