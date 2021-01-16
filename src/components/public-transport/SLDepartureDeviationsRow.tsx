import { faExclamationTriangle, faFireAlt, faInfoCircle, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export enum DeviationSeverity {
    None,
    Info,
    Warning,
    Critical
}

export function getDeviationSeverityIcon(severity: DeviationSeverity) {
    switch (severity) {
        case DeviationSeverity.None:
        default:
            return <FontAwesomeIcon icon={faSun} />
        
        case DeviationSeverity.Info:
            return <FontAwesomeIcon icon={faInfoCircle} />
        
        case DeviationSeverity.Warning:
            return <FontAwesomeIcon icon={faExclamationTriangle} />

        case DeviationSeverity.Critical:
            return <FontAwesomeIcon icon={faFireAlt} />
    }
}

export function getDeviationSeverityBg(severity: DeviationSeverity) {
    switch (severity) {
        case DeviationSeverity.None:
        default:
            return ""
        
        case DeviationSeverity.Info:
            return "bg-info"
        
        case DeviationSeverity.Warning:
            return "bg-warning"

        case DeviationSeverity.Critical:
            return "bg-danger"
    }
}

interface ISLDepartureDeviationsRow {
    disruptionsCount: number;
    highestSeverity: DeviationSeverity;
    modalId: string;
}

export const SLDepartureDeviationsRow: React.FunctionComponent<ISLDepartureDeviationsRow> = (props) => {

    if (props.disruptionsCount === 0) {
        return (
            <tr>
                <td className="text-center" colSpan={2}>{<FontAwesomeIcon icon={faSun} />}</td>
                <td colSpan={2}>Inga störningar</td>
            </tr>
        );
    }

    const getStyling = () => `${getDeviationSeverityBg(props.highestSeverity)} ${props.highestSeverity === DeviationSeverity.Warning ? "text-dark" : ""}`;

    return (
        <tr className={` sl-deviations-row`}
            data-toggle="modal" 
            data-target={props.modalId}>
            <td className={`${getStyling()} text-center`} colSpan={2}>
                { getDeviationSeverityIcon(props.highestSeverity) }
            </td>
            <td className={`${getStyling()}`} colSpan={2}>
                {props.disruptionsCount} störning{props.disruptionsCount !== 1 ? "ar" : ""}
            </td>
        </tr>
    );
}