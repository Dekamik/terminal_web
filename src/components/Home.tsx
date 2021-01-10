import * as React from 'react';
import { Clock } from './clock/Clock';
import { Navbar } from './navbar/Navbar';
import { SLNextDepartures } from './public-transport/SLNextDepartures';
import { WeatherSummaries } from './weather/WeatherSummaries';

export const Home: React.FunctionComponent = () => {
    return (
        <>
            <div className="row">
                <div className="col-4">
                    <Clock />
                </div>
                <div className="col-8">
                    <Navbar />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <WeatherSummaries />
                </div>
            </div>
                <div className="row">
                <div className="col-6">
                    <SLNextDepartures />
                </div>
            </div>
        </>
    );
}
