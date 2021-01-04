import { faExclamationTriangle, faFireAlt, faInfoCircle, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

interface ISLDepartureDisruptions {
    disruptionsCount: number;
    highestSeverity: DisruptionSeverity;
}

export enum DisruptionSeverity {
    None,
    Info,
    Warning,
    Critical
}

export function getDisruptionSeverityIcon(severity: DisruptionSeverity) {
    switch (severity) {
        case DisruptionSeverity.None:
        default:
            return <FontAwesomeIcon icon={faSun} />
        
        case DisruptionSeverity.Info:
            return <FontAwesomeIcon icon={faInfoCircle} />
        
        case DisruptionSeverity.Warning:
            return <FontAwesomeIcon icon={faExclamationTriangle} />

        case DisruptionSeverity.Critical:
            return <FontAwesomeIcon icon={faFireAlt} />
    }
}

export function getDisruptionSeverityBg(severity: DisruptionSeverity) {
    switch (severity) {
        case DisruptionSeverity.None:
        default:
            return ""
        
        case DisruptionSeverity.Info:
            return "bg-info"
        
        case DisruptionSeverity.Warning:
            return "bg-warning"

        case DisruptionSeverity.Critical:
            return "bg-danger"
    }
}

export const SLDepartureDisruptions: React.FunctionComponent<ISLDepartureDisruptions> = (props) => {

    return (
        <tr className={`${getDisruptionSeverityBg(props.highestSeverity)} ${props.highestSeverity === DisruptionSeverity.Warning ? "text-dark" : ""}`}>
            <td className="text-center" colSpan={2}>{getDisruptionSeverityIcon(props.highestSeverity)}</td>
            <td colSpan={2}>{props.disruptionsCount || "Inga"} störning{props.disruptionsCount !== 1 ? "ar" : ""}</td>
        </tr>
    );
}