import * as React from 'react';
import { SLNextDepartures } from './sl-departures/SLNextDepartures';
import { WeatherSummary } from './weather/WeatherSummary';

export const Home: React.FunctionComponent = () => {
    return (
        <div className="col-12 mx-auto home">
            <div className="row">
                <div className="col-4">
                    <WeatherSummary name="Vängsö" lat={59.103409} lon={17.218876} height={16} />
                </div>
                <div className="col-4">
                    <WeatherSummary name="Stora Ursvik" lat={59.384872} lon={17.947649} height={33} />
                </div>
                <div className="col-4">
                    <WeatherSummary name="Visby" lat={57.638437} lon={18.298376} height={22} />
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-3" />
                <div className="col-6">
                    <SLNextDepartures />
                </div>
                <div className="col-3" />
            </div>
        </div>
    );
}
