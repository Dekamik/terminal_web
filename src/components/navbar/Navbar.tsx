import { faCog, faHome, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export const Navbar: React.FunctionComponent = () => {

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark font-size-2">
            <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navBarAltMarkup">
                <div className="navbar-nav ml-auto">
                    <a className="nav-item nav-link active ml-4" href="/"><FontAwesomeIcon icon={faHome} /></a>
                    <a className="nav-item nav-link ml-4" href="/"><FontAwesomeIcon icon={faTasks} /></a>
                    <a className="nav-item nav-link ml-4" href="/"><FontAwesomeIcon icon={faCog} /></a>
                </div>
            </div>
        </nav>
    );
}