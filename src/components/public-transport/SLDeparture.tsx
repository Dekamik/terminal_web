import * as React from 'react';
import { getModeIcon, TransportMode } from '../../api/TrafikLab/TransportMode';

export interface ISLDeparture {
    trasportMode: TransportMode;
    lineNumber: string;
    destination: string;
    displayTime: string;
    color?: LineColor;
}

export enum LineColor {
    Green = "text-success",
    Blue = "text-primary",
    Red = "text-danger",
    Yellow = "text-warning",
    Magenta = "text-magenta"
}

export const SLDeparture: React.FunctionComponent<ISLDeparture> = (props) => {
    return (
        <tr>
            <td className={props.color}>{getModeIcon(props.trasportMode)}</td>
            <td>{props.lineNumber}</td>
            <td>{props.destination}</td>
            <td>{props.displayTime}</td>
        </tr>
    );
}