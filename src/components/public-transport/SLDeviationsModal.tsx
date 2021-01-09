import moment from "moment";
import React from "react";
import { isDayAfterTomorrow, isDayBeforeYesterday, isSameDate, isSameYear, isToday, isTomorrow, isYesterday } from "../../helpers/DateHelper";
import { ModalSize } from "../common/modal/ModalSize";
import { SingleButtonModal } from "../common/modal/SingleButtonModal";
import { DeviationSeverity } from "./SLDepartureDeviationsRow";

interface ISLDeviationsModal {
    deviations?: IDeviationItem[];
}

export interface IDeviationItem {
    id: string;
    header: string;
    details: string;
    lines: string;
    severity: DeviationSeverity;
    dateFrom: Date;
    dateTo: Date;
}

export const SLDeviationsModal: React.FunctionComponent<ISLDeviationsModal> = (props) => {

    const getSeverityClasses = (items: IDeviationItem) => {
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

    const getTimeStr = (time: Date) => moment(time).format("HH:mm");

    const getDateStr = (date: Date) => isToday(date) ? "idag" :
        isTomorrow(date) ? "imorgon" :
        isDayAfterTomorrow(date) ? "i övermorgon" :
        isYesterday(date) ? "igår" :
        isDayBeforeYesterday(date) ? "i förrgår" :
        `den ${moment(date).format("D/M")}`;

    return (
        <SingleButtonModal id="disruptionsModal" title="Störningar" modalSize={ModalSize.Large}>
            {
                props.deviations
                    ? props.deviations.map((item: IDeviationItem, i) => 
                        <div className="col-12" id="accordion" key={i}>
                            <div className="card text-white custom-border-dark">
                                <div className={`card-header ${getSeverityClasses(item)} text-center sl-disruptions-header`} 
                                    id={`header${item.id}`} 
                                    data-toggle="collapse" 
                                    data-target={`#details${item.id}`} 
                                    aria-expanded="false" 
                                    aria-controls={`details${item.id}`}>
                                    <h5 className="mx-auto">
                                        {item.header}
                                    </h5>
                                    <span>
                                        {item.lines}
                                    </span>
                                </div>
                                <div id={`details${item.id}`} className="collapse" aria-labelledby={`header${item.id}`} data-parent="#accordion">
                                    <div className="card-body bg-dark">
                                        <div className="row">
                                            <p>
                                                {item.details}
                                            </p>
                                        </div>
                                        <div className="row">
                                            <p>
                                                Detta påverkar {item.lines}
                                                {
                                                    isSameDate(item.dateFrom, item.dateTo) ? ` ${getDateStr(item.dateFrom)} mellan kl. ${moment(item.dateFrom).format("HH:mm")} och kl. ${moment(item.dateTo).format("HH:mm")}`
                                                        : isSameYear(item.dateFrom, item.dateTo) ? ` från ${getDateStr(item.dateFrom)} kl. ${getTimeStr(item.dateFrom)} till ${getDateStr(item.dateTo)} kl. ${getTimeStr(item.dateTo)}`
                                                        : ` från ${moment(item.dateFrom).format("YYYY-MM-DD HH:mm")} till ${moment(item.dateTo).format("YYYY-MM-DD HH:mm")}`
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : null
            }
        </SingleButtonModal>
    );
}