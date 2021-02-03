import moment from 'moment';
import * as React from 'react';
import { getDateStr, getTimeStr, isSameDate, isSameYear } from '../../helpers/DateHelper';
import { contains } from '../../helpers/StringHelper';
import { DeviationSeverity } from './SLDepartureDeviationsRow';

export interface ISLDeviationsModalItem {
    id: string;
    key: number;
    header: string;
    details: string;
    lines: string;
    severity: DeviationSeverity;
    dateFrom: Date;
    dateTo: Date;
}

export const SLDeviationsModalItem: React.FunctionComponent<ISLDeviationsModalItem> = (props) => {

    const getSeverityClasses = (items: ISLDeviationsModalItem) => {
        switch (items.severity) {

            case DeviationSeverity.Critical:
                return "bg-danger text-white";
            
            case DeviationSeverity.Warning:
                return "bg-warning text-dark";

            case DeviationSeverity.Info:
                return "bg-info text-white";
            
            case DeviationSeverity.None:
            default:
                return "";
        }
    }

    return (
        <>
            <div className={`card-header ${getSeverityClasses(props)} text-center sl-disruptions-header`} 
                id={`header${props.id}`} 
                data-toggle="collapse" 
                data-target={`#details${props.id}`} 
                aria-expanded="false" 
                aria-controls={`details${props.id}`}>
                <h5 className="mx-auto">
                    {props.header}
                </h5>
                {
                    !contains(props.header, props.lines)
                        ? <span>
                            {props.lines}
                        </span>
                        : null
                }
            </div>
            <div id={`details${props.id}`} className="collapse" aria-labelledby={`header${props.id}`} data-parent="#accordion">
                <div className="card-body bg-dark">
                    <div className="row">
                        <p>
                            {props.details}
                        </p>
                    </div>
                    <div className="row">
                        <p>
                            Detta påverkar {props.lines}
                            {
                                isSameDate(props.dateFrom, props.dateTo) ? ` ${getDateStr(props.dateFrom)} mellan kl. ${moment(props.dateFrom).format("HH:mm")} och kl. ${moment(props.dateTo).format("HH:mm")}`
                                    : isSameYear(props.dateFrom, props.dateTo) ? ` från ${getDateStr(props.dateFrom)} kl. ${getTimeStr(props.dateFrom)} till ${getDateStr(props.dateTo)} kl. ${getTimeStr(props.dateTo)}`
                                    : ` från ${moment(props.dateFrom).format("YYYY-MM-DD HH:mm")} till ${moment(props.dateTo).format("YYYY-MM-DD HH:mm")}`
                            }
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}