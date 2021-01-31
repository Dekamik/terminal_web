import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export const Settings: React.FunctionComponent = () => {


    return (
        <div className="col-11 mx-auto">
            <div className="row">
                <hr/>
            </div>
            <h1 className="text-center">Inställningar</h1>
            <div className="row">
                <hr/>
            </div>
            <div className="row">
                <div className="col-4">
                    
                </div>
                <div className="col-4">
                    <button className="btn btn-dark btn-block btn-lg" onClick={() => window.location.reload()}>
                        <FontAwesomeIcon icon={faSync} /> Ladda om appen
                    </button>
                </div>
                <div className="col-4">
                    
                </div>
            </div>
        </div>
    );
}
