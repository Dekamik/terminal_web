import { Api } from '../Api';
import { IDeviationsResponse } from './IDeviationsResponse';
import { IFindStationResponse } from './IFindStationResponse';
import { IRealTimeDeparturesResponse } from './IRealTimeDeparturesResponse';

export class TrafikLabApi extends Api {
    findStationKey = process.env.REACT_APP_API_TRAFIKLAB_FINDSTATION_KEY;
    findStationUrl = process.env.REACT_APP_API_TRAFIKLAB_FINDSTATION_URL;

    deviationsApiKey = process.env.REACT_APP_API_TRAFIKLAB_DEVIATIONS_KEY;
    deviationsApiUrl = process.env.REACT_APP_API_TRAFIKLAB_DEVIATIONS_URL;

    realTimeApiKey = process.env.REACT_APP_API_TRAFIKLAB_REALTIMEDEPARTURES_KEY;
    realTimeApiUrl = process.env.REACT_APP_API_TRAFIKLAB_REALTIMEDEPARTURES_URL;

    findStation(searchString: string, success: (data: IFindStationResponse) => void, error?: (message: string) => void, final?: () => void) {
        this.get(`${this.findStationUrl}?key=${this.findStationKey}&searchstring=${searchString}&stationsonly=true&maxresults=1`, success, error, final);
    }

    getDeviations(transportMode: string, lineNumber: string, success: (data: IDeviationsResponse) => void, error?: (message: string) => void, final?: () => void) {
        this.get(`${this.deviationsApiUrl}?key=${this.deviationsApiKey}&transportMode=${transportMode}&lineNumber=${lineNumber}`, success, error, final);
    }

    getRealTimeDepartures(siteId: number, timeWindow: number, success: (data: IRealTimeDeparturesResponse) => void, error?: (message: string) => void, final?: () => void) {
        this.get(`${this.realTimeApiUrl}?key=${this.realTimeApiKey}&siteid=${siteId}&timewindow=${timeWindow}`, success, error, final);
    }
}