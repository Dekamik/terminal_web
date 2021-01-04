import * as React from 'react';
import { AlertTriangle, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Cloud, Sun } from 'react-feather';

interface IWeatherIcon {
    weather: string;
    size: number;
    color?: string;
}

export const WeatherIcon: React.FunctionComponent<IWeatherIcon> = (props) => {

    switch (props.weather) {
        
        case 'Sun':
        case 'LightCloud':
            return <Sun size={props.size} color={props.color}/>

        case 'PartlyCloud':
        case 'Cloud':
            return <Cloud size={props.size} color={props.color}/>

        case "Snow":
            return <CloudSnow size={props.size} color={props.color}/>

        case "Drizzle":
        case "LightRain":
            return <CloudDrizzle size={props.size} color={props.color}/>

        case "Rain":
            return <CloudRain size={props.size} color={props.color}/>
        
        default:
            return <AlertTriangle size={props.size} color={props.color}/>
    }
}
