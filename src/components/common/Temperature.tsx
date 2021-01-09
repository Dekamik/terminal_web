import * as React from 'react';
import { roundNumber } from '../../helpers/NumberHelper';

interface ITemperature {
    temperature?: number;
    unit?: TemperatureUnit;
    coldTemperatureLimit?: number;
    hotTemperatureLimit?: number;
    veryHotTemperatureLimit?: number;
}

export enum TemperatureUnit {
    Celsius = "C",
    Fahrenheit = "F",
    Kelvin = "K"
}

export const Temperature: React.FunctionComponent<ITemperature> = (props) => {
    return (
        <div className={"temperature " + 
            (props.temperature != null 
                ? (props.temperature >= (props.hotTemperatureLimit || 10) ? "text-magenta" 
                    : props.temperature <= (props.coldTemperatureLimit || 0) ? "text-primary" 
                    : props.temperature >= (props.veryHotTemperatureLimit || 25) ? "text-danger"
                    : "text-blue") 
                : "text-warning")}>
            {
                props.temperature != null
                    ? `${props.temperature > 0 ? "+" : ""}${roundNumber(props.temperature)}°${props.unit || ""}`
                    : "N/A"
            }
        </div>
    );
}