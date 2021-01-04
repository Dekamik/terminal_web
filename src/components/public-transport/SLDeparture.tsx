import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { getModeIcon, SLMode } from './SLModes';

export interface ISLDeparture {
    mode: SLMode;
    line: string;
    endStation: string;
    departsAt: string;
    color?: LineColor;
}

export enum LineColor {
    Green = "text-success",
    Blue = "text-primary",
    Red = "text-danger"
}

export const SLDeparture: React.FunctionComponent<ISLDeparture> = (props) => {
    return (
        <tr>
            <td className={props.color}>{getModeIcon(props.mode)}</td>
            <td>{props.line}</td>
            <td>{props.endStation}</td>
            <td>{props.departsAt}</td>
        </tr>
    );
}