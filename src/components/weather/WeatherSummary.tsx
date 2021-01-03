import * as React from 'react';
import { WeatherIcon } from './WeatherIcon';

interface IWeatherSummary {
    name: string;
    lat: number;
    lon: number;
    msl: number;
}

export const WeatherSummary: React.FunctionComponent<IWeatherSummary> = (props) => {

    const [tempC, setTempC] = React.useState<number>(10);
    const [weather, setWeather] = React.useState<string>();

    return (
        <div className="weather-summary">
            <h2>{props.name}</h2>
            <div className={"weather " + (tempC >= 10 ? "hot" : "cold")}>
                {tempC >= 0 ? "+" : ""}{tempC}°C 
            </div>
            <div>
                <WeatherIcon weather="Sun" size={48} />
            </div>
        </div>
    );
}