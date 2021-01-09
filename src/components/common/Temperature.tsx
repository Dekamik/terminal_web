import * as React from 'react';

interface ITemperature {
    temperature?: number;
    unit?: TemperatureUnit;
    coldTemperatureLimit?: number;
    hotTemperatureLimit?: number;
}

export enum TemperatureUnit {
    Celsius = "C",
    Fahrenheit = "F",
    Kelvin = "K"
}

export const Temperature: React.FunctionComponent<ITemperature> = (props) => {
    return (
        <div className={"temperature " + (props.temperature != null ? (props.temperature >= (props.hotTemperatureLimit || 10) ? "text-magenta" : props.temperature <= (props.coldTemperatureLimit || 0) ? "text-blue" : "text-primary") : "text-warning")}>
            {
                props.temperature != null
                    ? `${props.temperature > 0 ? "+" : ""}${props.temperature}°${props.unit || ""}`
                    : "N/A"
            }
        </div>
    );
}