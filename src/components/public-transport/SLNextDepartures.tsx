import * as React from 'react';
import { IRealTimeDeparture, IRealTimeDeparturesResponse } from '../../api/TrafikLab/IRealTimeDeparturesResponse';
import { TrafikLabApi } from '../../api/TrafikLab/TrafikLabApi';
import { TransportMode } from '../../api/TrafikLab/TransportMode';
import { LineColor, SLDeparture } from './SLDeparture';
import { DisruptionSeverity, SLDepartureDisruptions } from './SLDepartureDisruptions';

interface ISLNextDepartures {
    stopName: string;
}

interface IDepartureItem {
    transportMode: TransportMode;
    lineNumber: string;
    destination: string;
    departAt: Date;
    displayTime: string;
    color?: LineColor;
}

export const SLNextDepartures: React.FunctionComponent<ISLNextDepartures> = (props) => {

    const [departures, setDepartures] = React.useState<IDepartureItem[]>();

    React.useEffect(() => {
        let interval = Number.parseInt(process.env.REACT_APP_API_TRAFIKLAB_REALTIMEDEPARTURES_INTERVAL || "-1");

        function updateDepartures() {
            let api = new TrafikLabApi();
            let siteId = Number.parseInt(process.env.REACT_APP_API_TRAFIKLAB_SITEID || "-1");

            const mapDepartures = (items: IRealTimeDeparture[]) =>
                items.map(item => { 
                    return {
                        transportMode: item.transportMode, 
                        lineNumber: item.lineNumber, 
                        destination: item.destination, 
                        departAt: item.expectedDateTime,
                        displayTime: item.displayTime}
                    }
                );

            api.getRealTimeDepartures(siteId, 60,
                (data: IRealTimeDeparturesResponse) => {
                    let mappedDepartures: IDepartureItem[] = [];

                    mappedDepartures.concat(mapDepartures(data.buses));
                    mappedDepartures.concat(mapDepartures(data.metros));
                    mappedDepartures.concat(mapDepartures(data.trains));
                    mappedDepartures.concat(mapDepartures(data.trams));
                    mappedDepartures.concat(mapDepartures(data.ships));
                    mappedDepartures.sort((a, b) => a.departAt > b.departAt ? 1 : a.departAt < b.departAt ? -1 : 0);
                    mappedDepartures.filter(item => item.departAt <= mappedDepartures[4].departAt);

                    setDepartures(mappedDepartures);
                },
                (message: string) => {
                    console.log(message);
                }
            );
        }

        updateDepartures();

        let updateInterval = setInterval(() => {
            updateDepartures();
        }, interval);

        return function cleanup() {
            clearInterval(updateInterval);
        }
    }, []); 

    return (
        <div className="col-12 sl-next-departures">
            <h2 className="text-center">SL - {props.stopName}</h2>
            <table className="table table-dark table-sm table-borderless">
                <tbody>
                    {
                        departures && departures.length 
                            ? departures.map((departure: IDepartureItem) => 
                                <SLDeparture 
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