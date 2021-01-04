import * as React from 'react';
import { WeatherSummary } from './WeatherSummary';

export const WeatherSummaries: React.FunctionComponent = () => {

    return (
        <div className="row">
          <div className="col-4">
            <WeatherSummary name="Stora Ursvik" lon={0} lat={0} msl={0}/>
          </div>
          <div className="col-4">
            <WeatherSummary name="Visby" lon={0} lat={0} msl={0}/>
          </div>
          <div className="col-4">
            <WeatherSummary name="Vängsö" lon={0} lat={0} msl={0}/>
          </div>
        </div>
    );
}