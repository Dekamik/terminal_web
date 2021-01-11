import * as React from 'react';
import { SLNextDepartures } from './public-transport/SLNextDepartures';
import { WeatherSummary } from './weather/WeatherSummary';

export const Home: React.FunctionComponent = () => {
    return (
        <div className="home">
            <div className="row">
                <div className="col-4">
                    <WeatherSummary name="Vängsö" modalId="vängsöWeatherModal" lat={59.103409} lon={17.218876} height={16} />
                </div>
                <div className="col-4">
                    <WeatherSummary name="Stora Ursvik" modalId="storaUrsvikweatherModal" lat={59.384872} lon={17.947649} height={33} />
                </div>
                <div className="col-4">
                    <WeatherSummary name="Visby" modalId="visbyWeatherModal" lat={57.638437} lon={18.298376} height={22} />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <SLNextDepartures />
                </div>
            </div>
        </div>
    );
}
