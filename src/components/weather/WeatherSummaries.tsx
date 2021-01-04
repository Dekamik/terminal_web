import * as React from 'react';
import { WeatherSummary } from './WeatherSummary';

interface ILocationData {
    lat: number;
    lon: number;
    height: number;
}

export const WeatherSummaries: React.FunctionComponent = () => {

    const storaUrsvik: ILocationData = {lat: 59.384872, lon: 17.947649, height: 33};
    const visby: ILocationData = {lat: 57.638437, lon: 18.298376, height: 22};
    const vängsö: ILocationData = {lat: 59.103409, lon: 17.218876, height: 16};

    return (
        <div className="row">
          <div className="col-4">
            <WeatherSummary name="Stora Ursvik" temperature={-10.2} weatherCode="heavysnowandthunder"/>
          </div>
          <div className="col-4">
            <WeatherSummary name="Visby" temperature={25.6} weatherCode="clearsky_day" />
          </div>
          <div className="col-4">
            <WeatherSummary name="Vängsö" temperature={0} weatherCode="fog" />
          </div>
        </div>
    );
}