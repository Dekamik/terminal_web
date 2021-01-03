import * as React from 'react';
import { WeatherIcon } from './WeatherIcon';

interface IWeatherSummary {
    name: string;
    lat: number;
    lon: number;
    msl: number;
}

export const WeatherSummary: React.FunctionComponent<IWeatherSummary> = (props) => {

    const [tempC, setTempC] = React.useState<number>(0);
    const [weather, setWeather] = React.useState<string>();

    return (
        <div className="weather-summary">
            <div className="header">{props.name}</div>
            <div className={"temperature " + (tempC >= 10 ? "hot" : "cold")}>
                {tempC > 0 ? "+" : ""}{tempC}°C 
            </div>
            <div>
                <WeatherIcon weather="Cloud" size={48} />
            </div>
        </div>
    );
}