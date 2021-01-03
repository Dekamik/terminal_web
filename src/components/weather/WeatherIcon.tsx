import * as React from 'react';
import { AlertTriangle, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Cloud, Sun } from 'react-feather';

interface IWeatherIcon {
    weather: string;
    size: number;
}

export const WeatherIcon: React.FunctionComponent<IWeatherIcon> = (props) => {

    switch (props.weather) {
        
        case 'Sun':
        case 'LightCloud':
            return <Sun size={props.size}/>

        case 'PartlyCloud':
        case 'Cloud':
            return <Cloud size={props.size}/>

        case "Snow":
            return <CloudSnow size={props.size}/>

        case "Drizzle":
        case "LightRain":
            return <CloudDrizzle size={props.size}/>

        case "Rain":
            return <CloudRain size={props.size}/>
        
        default:
            return <AlertTriangle size={props.size}/>
    }
}
