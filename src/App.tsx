import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Home } from './components/Home';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar';
import { HOME, SETTINGS, RSS_FEED, HEALTH_CHECKS } from './routes/WebRoutes';
import { Settings } from './components/settings/Settings';
import { RssFeed } from './components/rss/RssFeed';
import { HealthChecks } from './components/health-checks/HealthChecks';

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
          <div className="col-8">
            <Navbar />
          </div>
        </div>
        <div className="content">
          <Component {...props} />
        </div>
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
          <NavRoute path={RSS_FEED} component={RssFeed} />
          <NavRoute path={HEALTH_CHECKS} component={HealthChecks} />
          <NavRoute path={SETTINGS} component={Settings} />
        </Switch>
      </BrowserRouter>
    );
  }
}
