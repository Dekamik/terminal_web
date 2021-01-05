import * as React from 'react';
import { IFindStationResponse } from '../../api/TrafikLab/IFindStationResponse';
import { IRealTimeDeparture, IRealTimeDeparturesResponse } from '../../api/TrafikLab/IRealTimeDeparturesResponse';
import { TrafikLabApi } from '../../api/TrafikLab/TrafikLabApi';
import { TransportMode } from '../../api/TrafikLab/TransportMode';
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

export const SLNextDepartures: React.FunctionComponent = () => {

    const [siteId, setSiteId] = React.useState<number>(-1);
    const [homeStation, setHomeStation] = React.useState<string | undefined>("");
    const [maxDepartures, setMaxDepartures] = React.useState<number>();
    const [departures, setDepartures] = React.useState<IDepartureItem[]>();

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
    }, [api, siteId, maxDepartures]);

    const findStation = React.useCallback(() => {
        if (homeStation) {
            api.findStation(homeStation, (data: IFindStationResponse) => {
                setSiteId(data.ResponseData[0].SiteId);
                updateDepartures();
            },
            (message: string) => {
                console.log(message);
            });
        }
    }, [api, homeStation, updateDepartures]);

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
                            ? departures.map((departure: IDepartureItem) => 
                                <SLDeparture key={departure.departAt.toString()}
                                    trasportMode={departure.transportMode} 
                                    lineNumber={departure.lineNumber}
                                    destination={departure.destination}
                                    displayTime={departure.displayTime}
                                    color={departure.color} />
                                )
                            : <tr><td colSpan={2}></td><td colSpan={2}>Inga avgångar</td></tr>
                    }
                    <SLDepartureDisruptions disruptionsCount={0} highestSeverity={DisruptionSeverity.None} />
                </tbody>
            </table>
        </div>
    );
}