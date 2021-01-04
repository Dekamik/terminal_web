import * as React from 'react';

interface ITemperature {
    temperature: number;
    unit?: TemperatureUnit;
    hotTemperatureLimit?: number;
}

export enum TemperatureUnit {
    Celsius = "C",
    Fahrenheit = "F",
    Kelvin = "K"
}

export const Temperature: React.FunctionComponent<ITemperature> = (props) => {
    return (
        <div className={"temperature " + (props.temperature >= (props.hotTemperatureLimit || 10) ? "hot" : "cold")}>
            {props.temperature > 0 ? "+" : ""}{props.temperature}°{props.unit || TemperatureUnit.Celsius} 
        </div>
    );
}