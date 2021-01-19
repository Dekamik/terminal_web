import * as React from 'react';
import { getModeIcon, TransportMode } from '../../api/TrafikLab/TransportMode';

export interface ISLDeparture {
    isNext: boolean;
    trasportMode: TransportMode;
    lineNumber: string;
    destination: string;
    departAt: Date;
    displayTime: string;
    color?: LineColor;
    imminentMillis?: number;
}

export enum LineColor {
    Green = "text-success",
    Blue = "text-primary",
    Red = "text-danger",
    Yellow = "text-warning",
    Magenta = "text-magenta",
    Purple = "text-purple",
    Teal = "text-info",
    None = ""
}

export function getLineColor(transportMode: TransportMode, groupOfLine?: string) {
    switch (transportMode) {
        case TransportMode.Bus:
            return groupOfLine === "blåbuss" ? LineColor.Blue : LineColor.Red;

        case TransportMode.Metro:
            return groupOfLine === "tunnelbanans blå linje" ? LineColor.Blue 
                : groupOfLine === "tunnelbanans röda linje" ? LineColor.Red 
                : groupOfLine === "tunnelbanans gröna linje" ? LineColor.Green 
                : LineColor.None;
        
        case TransportMode.Train:
            return LineColor.Magenta;
        
        case TransportMode.Tram:
            return LineColor.Teal;
        
        case TransportMode.Ship:
            return groupOfLine === "Waxholmsbolaget" ? LineColor.Yellow : LineColor.None;
        
        default:
            return LineColor.None;
    }
}

export const SLDeparture: React.FunctionComponent<ISLDeparture> = (props) => {

    const isImminent = () => (new Date(props.departAt).getTime() - new Date().getTime()) < (props.imminentMillis || 180000);

    return (
        <tr className={props.isNext && isImminent() ? "imminent" : ""}>
            <td className={`transport-mode-icon ${props.color}`}>{getModeIcon(props.trasportMode)}</td>
            <td>{props.lineNumber}</td>
            <td>{props.destination}</td>
            <td>{props.displayTime}</td>
        </tr>
    );
}