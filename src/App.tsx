import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Home } from './components/Home';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom'
import { Clock } from './components/clock/Clock';
import { Navbar } from './components/navbar/Navbar';
import { SL_TRAVEL_PLANNER, HOME, SETTINGS, TODO } from './routes/WebRoutes';
import { Settings } from './components/Settings';
import { SLTravelPlanner } from './components/SLTravelPlanner';
import { Todo } from './components/Todo';

const NavRoute = ({exact = false, path, component: Component}) => {

  const location = useLocation();

  const getLayout = () => {
    switch (location.pathname) {

      case HOME:
        return "flex-fill";
      
      default:
        return "";
    }
  }

  return (
    <Route exact={exact} path={path} render={(props) => (
      <div className={`app bg-dark ${getLayout()}`}>
        <div className="row">
          <div className="col-4">
            <Clock />
          </div>
          <div className="col-4">
            {/* Alerts */}
          </div>
          <div className="col-4">
            <Navbar />
          </div>
        </div>
        <Component {...props} />
      </div>
    )}/>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <NavRoute exact path={HOME} component={Home} />
          <NavRoute path={SL_TRAVEL_PLANNER} component={SLTravelPlanner} />
          <NavRoute path={TODO} component={Todo} />
          <NavRoute path={SETTINGS} component={Settings} />
        </Switch>
      </BrowserRouter>
    );
  }
}
