import moment from 'moment';
import * as React from 'react';
import { IDeviations, IDeviationsResponse } from '../../api/TrafikLab/IDeviationsResponse';
import { IFindStationResponse } from '../../api/TrafikLab/IFindStationResponse';
import { IRealTimeDeparture, IRealTimeDeparturesResponse } from '../../api/TrafikLab/IRealTimeDeparturesResponse';
import { TrafikLabApi } from '../../api/TrafikLab/TrafikLabApi';
import { TransportMode } from '../../api/TrafikLab/TransportMode';
import { ModalSize } from '../common/modal/ModalSize';
import { SingleButtonModal } from '../common/modal/SingleButtonModal';
import { getLineColor, LineColor, SLDeparture } from './SLDeparture';
import { DisruptionSeverity, SLDepartureDisruptions } from './SLDepartureDisruptions';

interface IDepartureItem {
    transportMode: TransportMode;
    lineNumber: string;
    destination: string;
    departAt: Date;
    displayTime: string;
    color?: LineColor;
}

interface IDeviationItem {
    id: string;
    header: string;
    details: string;
    lines: string;
    severity: DisruptionSeverity;
    dateFrom: Date;
    dateTo: Date;
}

export const SLNextDepartures: React.FunctionComponent = () => {

    const [siteId, setSiteId] = React.useState<number>(-1);
    const [homeStation, setHomeStation] = React.useState<string | undefined>("");
    const [maxDepartures, setMaxDepartures] = React.useState<number>();
    const [departures, setDepartures] = React.useState<IDepartureItem[]>();
    const [deviationsLines, setDeviationsLines] = React.useState<string | undefined>();
    const [deviationsModes, setDeviationsModes] = React.useState<string | undefined>();
    const [deviations, setDeviations] = React.useState<IDeviationItem[]>();

    const api = React.useMemo(() => new TrafikLabApi(), []);

    const mapDepartures = (items?: IRealTimeDeparture[]) =>
        items
            ? items.map(item => 
                ({
                    transportMode: item.TransportMode, 
                    lineNumber: item.LineNumber, 
                    destination: item.Destination, 
                    departAt: item.ExpectedDateTime,
                    displayTime: item.DisplayTime,
                    color: getLineColor(item.TransportMode, item.GroupOfLine)
                }))
            : [];

    const updateDepartures = React.useCallback(() => {
        if (siteId) {
            api.getRealTimeDepartures(siteId, 60,
                (data: IRealTimeDeparturesResponse) => {
                    let mappedDepartures: IDepartureItem[] = [
                        ...mapDepartures(data.ResponseData.Buses),
                        ...mapDepartures(data.ResponseData.Metros),
                        ...mapDepartures(data.ResponseData.Trains),
                        ...mapDepartures(data.ResponseData.Trams),
                        ...mapDepartures(data.ResponseData.Ships)
                    ];
                    
                    mappedDepartures.sort((a, b) => a.departAt > b.departAt ? 1 : a.departAt < b.departAt ? -1 : 0);
                    mappedDepartures.length = maxDepartures || 5;
    
                    setDepartures(mappedDepartures);
                },
                (message: string) => {
                    console.log(message);
                }
            );
        }
    }, [api, siteId, maxDepartures]);

    const findStation = React.useCallback(() => {
        if (homeStation) {
            api.findStation(homeStation, 
                (data: IFindStationResponse) => {
                    setSiteId(data.ResponseData[0].SiteId);
                    updateDepartures();
                },
                (message: string) => {
                    console.log(message);
                }
            );
        }
    }, [api, homeStation, updateDepartures]);

    const getDeviations = React.useCallback(() => {
        const determineSeverity = (item: IDeviations) => 
            item.MainNews ? DisruptionSeverity.Critical
            : item.Header.toLowerCase().indexOf('försen') !== -1 || item.Header.toLowerCase().indexOf('inställd') !== -1 ? DisruptionSeverity.Warning
            : DisruptionSeverity.Info;

        if (deviationsLines && deviationsModes) {
            api.getDeviations(deviationsModes, deviationsLines, 
                (data: IDeviationsResponse) => {
                    setDeviations(data.ResponseData.map((item: IDeviations) => ({
                        id: item.DevCaseGid.toString(),
                        header: item.Header,
                        details: item.Details,
                        lines: item.Scope,
                        severity: determineSeverity(item),
                        dateFrom: item.FromDateTime,
                        dateTo: item.UpToDateTime
                    })));
                },
                (message: string) => {
                    console.log(message);
                }
            );
        }
    }, [api, deviationsLines, deviationsModes]);

    React.useEffect(() => {
        let interval = Number.parseInt(process.env.REACT_APP_API_TRAFIKLAB_REALTIMEDEPARTURES_INTERVAL || "-1");

        setHomeStation(process.env.REACT_APP_API_TRAFIKLAB_HOME);
        setMaxDepartures(Number.parseInt(process.env.REACT_APP_API_TRAFIKLAB_REALTIMEDEPARTURES_MAXDEPARTURES || "5"));

        findStation();

        if (interval !== -1) {
            let updateInterval = setInterval(() => {
                updateDepartures();
            }, interval);

            return function cleanup() {
                clearInterval(updateInterval);
            }
        }
    }, [findStation, updateDepartures]);

    React.useEffect(() => {
        let interval = Number.parseInt(process.env.REACT_APP_API_TRAFIKLAB_DEVIATIONS_INTERVAL || "-1");

        setDeviationsLines(process.env.REACT_APP_API_TRAFIKLAB_DEVIATIONS_LINES);
        setDeviationsModes(process.env.REACT_APP_API_TRAFIKLAB_DEVIATIONS_MODES);

        getDeviations();

        if (interval !== -1) {
            let updateInterval = setInterval(() => {
                getDeviations();
            }, interval);

            return function cleanup() {
                clearInterval(updateInterval);
            }
        }
    }, [getDeviations]);

    const getSeverityClasses = (items: IDeviationItem) => {
        switch (items.severity) {

            case DisruptionSeverity.Critical:
                return "bg-danger text-white";
            
            case DisruptionSeverity.Warning:
                return "bg-warning text-dark";

            case DisruptionSeverity.Info:
                return "bg-info text-white";
            
            case DisruptionSeverity.None:
            default:
                return "";
        }
    }

    const getHighestSeverity = (items?: IDeviationItem[]) => {
        if (items) {
            if (items.filter((item => item.severity === DisruptionSeverity.Critical)).length !== 0) {
                return DisruptionSeverity.Critical;
            }
            else if (items.filter((item => item.severity === DisruptionSeverity.Warning)).length !== 0) {
                return DisruptionSeverity.Warning;
            }
            else if (items.filter((item => item.severity === DisruptionSeverity.Info)).length !== 0) {
                return DisruptionSeverity.Info;
            }
        }
        return DisruptionSeverity.None;
    }

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

    return (
        <div className="col-12 sl-next-departures">
            <h2 className="text-center">
                {
                    homeStation ? `SL - ${homeStation}` : "Station saknas"
                }
            </h2>
            <table className="table table-dark table-sm table-borderless">
                <tbody>
                    {
                        departures && departures.length 
                            ? departures.map((departure: IDepartureItem, i: number) => 
                                <SLDeparture key={i}
                                    trasportMode={departure.transportMode} 
                                    lineNumber={departure.lineNumber}
                                    destination={departure.destination}
                                    displayTime={departure.displayTime}
                                    color={departure.color} />
                                )
                            : <tr key={0}><td colSpan={2}></td><td colSpan={2}>Inga avgångar</td></tr>
                    }
                    <SLDepartureDisruptions key={6} disruptionsCount={deviations?.length || 0} highestSeverity={getHighestSeverity(deviations)} modalId="#disruptionsModal" />
                </tbody>
            </table>
            <SingleButtonModal id="disruptionsModal" title="Störningar" modalSize={ModalSize.Large}>
                {
                    deviations
                        ? deviations.map((item: IDeviationItem) => 
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
        </div>
    );
}