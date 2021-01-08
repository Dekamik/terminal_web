import moment from "moment";
import React from "react";
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

    const isSameDate = (a: Date, b: Date) => {
        let first = moment(a);
        let second = moment(b);

        return first.year() === second.year()
            && first.month() === second.month()
            && first.date() === second.date();
    }

    const isSameYear = (a: Date, b: Date) => {
        let first = moment(a);
        let second = moment(b);

        return first.year() === second.year();
    }

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

    return (
        <SingleButtonModal id="disruptionsModal" title="Störningar" modalSize={ModalSize.Large}>
            {
                props.deviations
                    ? props.deviations.map((item: IDeviationItem) => 
                        <div className="col-12" id="accordion">
                            <div className="card">
                                <div className={`card-header ${getSeverityClasses(item)}`} id={`header${item.id}`} data-toggle="collapse" data-target={`#details${item.id}`} aria-expanded="false" aria-controls={`details${item.id}`}>
                                    <h5 className="text-center mx-auto">
                                        {item.header}
                                    </h5>
                                </div>
                                <div id={`details${item.id}`} className="collapse" aria-labelledby={`header${item.id}`} data-parent="#accordion">
                                    <div className="card-body">
                                        <div className="row">
                                            <p>
                                                {item.details}
                                            </p>
                                        </div>
                                        <div className="row">
                                            <p>
                                                Detta påverkar {item.lines} mellan 
                                                {
                                                    isSameDate(item.dateFrom, item.dateTo) ? ` ${moment(item.dateFrom).format("HH:mm")} och ${moment(item.dateTo).format("HH:mm")} den ${moment(item.dateTo).format("D/M")}`
                                                        : isSameYear(item.dateFrom, item.dateTo) ? ` ${moment(item.dateFrom).format("HH:mm D/M")} och ${moment(item.dateTo).format("HH:mm D/M")}`
                                                        : ` ${moment(item.dateFrom).format("HH:mm D/M YYYY")} och ${moment(item.dateTo).format("HH:mm D/M YYYY")}`
                                                        
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