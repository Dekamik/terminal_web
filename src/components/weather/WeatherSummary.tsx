import * as React from 'react';
import { Temperature } from '../common/Temperature';

interface IWeatherSummary {
    name: string;
    temperature: number;
    weatherCode: string;
}

export const WeatherSummary: React.FunctionComponent<IWeatherSummary> = (props) => {
    return (
        <div className="weather-summary">
            <div className="header">{props.name}</div>
            <Temperature temperature={props.temperature} />
            <div className="weather-icon">
                <img className="filter-white" src={"/images/weathericons/" + props.weatherCode + ".svg"} alt={props.weatherCode} />
            </div>
        </div>
    );
}