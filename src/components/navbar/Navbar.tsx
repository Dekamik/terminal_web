import { faBusAlt, faChartLine, faCog, faHome, faRss, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { HOME, RSS_FEED, SETTINGS, SL_TRAVEL_PLANNER, STOCKS, TODO } from '../../routes/WebRoutes';
import { Clock } from '../clock/Clock';

export const Navbar: React.FunctionComponent = () => {

    return (
        <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark font-size-2">
            <Clock />
            <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navBarAltMarkup">
                <div className="navbar-nav ml-auto">
                    <NavLink exact to={HOME} className="nav-item nav-link ml-4" activeClassName="active" ><FontAwesomeIcon icon={faHome} /></NavLink>
                    <NavLink to={RSS_FEED} className="nav-item nav-link ml-4" activeClassName="active"><FontAwesomeIcon icon={faRss} /></NavLink>
                    <NavLink to={SL_TRAVEL_PLANNER} className="nav-item nav-link ml-4" activeClassName="active" ><FontAwesomeIcon icon={faBusAlt} /></NavLink>
                    {
                        /*
                        <NavLink to={TODO} className="nav-item nav-link ml-4" activeClassName="active" ><FontAwesomeIcon icon={faTasks} /></NavLink>
                        <NavLink to={STOCKS} className="nav-item nav-link ml-4" activeClassName="active"><FontAwesomeIcon icon={faChartLine} /></NavLink>
                        */
                    }
                    <NavLink to={SETTINGS} className="nav-item nav-link ml-4" activeClassName="active" ><FontAwesomeIcon icon={faCog} /></NavLink>
                </div>
            </div>
        </nav>
    );
}