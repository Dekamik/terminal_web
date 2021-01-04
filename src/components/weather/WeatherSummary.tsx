import * as React from 'react';
import { Temperature } from '../common/Temperature';
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
            <Temperature temperature={0} />
            <div>
                <WeatherIcon weather="Cloud" size={48} />
            </div>
        </div>
    );
}