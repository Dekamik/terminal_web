import * as React from 'react';
import { IDeviations, IDeviationsResponse } from '../../api/TrafikLab/IDeviationsResponse';
import { IFindStationResponse } from '../../api/TrafikLab/IFindStationResponse';
import { IRealTimeDeparture, IRealTimeDeparturesResponse } from '../../api/TrafikLab/IRealTimeDeparturesResponse';
import { TrafikLabApi } from '../../api/TrafikLab/TrafikLabApi';
import { TransportMode } from '../../api/TrafikLab/TransportMode';
import { getLineColor, LineColor, SLDeparture } from './SLDeparture';
import { DeviationSeverity, SLDepartureDeviationsRow } from './SLDepartureDeviationsRow';
import { IDeviationItem, SLDeviationsModal } from './SLDeviationsModal';
import { contains } from '../../helpers/StringHelper';
import { Spinner } from '../common/Spinner';

interface IDepartureItem {
    transportMode: TransportMode;
    lineNumber: string;
    destination: string;
    departAt: Date;
    displayTime: string;
    color?: LineColor;
}

export const SLNextDepartures: React.FunctionComponent = () => {

    const [siteId, setSiteId] = React.useState<number>(-1);
    const [homeStation, setHomeStation] = React.useState<string | undefined>("");
    const [maxDepartures, setMaxDepartures] = React.useState<number>();
    const [departures, setDepartures] = React.useState<IDepartureItem[]>();
    const [deviationsLines, setDeviationsLines] = React.useState<string | undefined>();
    const [deviationsModes, setDeviationsModes] = React.useState<string | undefined>();
    const [deviations, setDeviations] = React.useState<IDeviationItem[]>();

    const [isFindStationLoading, setIsFindStationLoading] = React.useState<boolean>(true);
    const [isDeparturesLoading, setIsDeparturesLoading] = React.useState<boolean>(true);
    const [isDeviationsLoading, setIsDeviationsLoading] = React.useState<boolean>(true);

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
                },
                () => {
                    setIsDeparturesLoading(false);
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
                },
                () => {
                    setIsFindStationLoading(false);
                }
            );
        }
    }, [api, homeStation, updateDepartures]);

    const getDeviations = React.useCallback(() => {
        const determineSeverity = (item: IDeviations) => 
            item.MainNews || contains(item.Header, 'stopp') ? DeviationSeverity.Critical 
            : contains(item.Header, 'försen') || contains(item.Header, 'fel') ? DeviationSeverity.Warning
            : DeviationSeverity.Info;

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
                },
                () => {
                    setIsDeviationsLoading(false);
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

    const getHighestDeviationSeverity = (items?: IDeviationItem[]) => {
        if (items) {
            if (items.filter((item => item.severity === DeviationSeverity.Critical)).length !== 0) {
                return DeviationSeverity.Critical;
            }
            else if (items.filter((item => item.severity === DeviationSeverity.Warning)).length !== 0) {
                return DeviationSeverity.Warning;
            }
            else if (items.filter((item => item.severity === DeviationSeverity.Info)).length !== 0) {
                return DeviationSeverity.Info;
            }
        }
        return DeviationSeverity.None;
    }

    return (
        <Spinner isLoading={isFindStationLoading || isDeparturesLoading || isDeviationsLoading}>
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
                        <SLDepartureDeviationsRow key={6} disruptionsCount={deviations?.length || 0} highestSeverity={getHighestDeviationSeverity(deviations)} modalId="#disruptionsModal" />
                    </tbody>
                </table>
                <SLDeviationsModal deviations={deviations} />
            </div>
        </Spinner>
    );
}