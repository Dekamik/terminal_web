import { Api } from '../Api';
import { IFindStationResponse } from './IFindStationResponse';
import { IRealTimeDeparturesResponse } from './IRealTimeDeparturesResponse';

export class TrafikLabApi extends Api {
    findStationUrl = process.env.REACT_APP_API_TRAFIKLAB_FINDSTATION_URL;
    findStationKey = process.env.REACT_APP_API_TRAFIKLAB_FINDSTATION_KEY;

    realTimeApiUrl = process.env.REACT_APP_API_TRAFIKLAB_REALTIMEDEPARTURES_URL;
    realTimeApiKey = process.env.REACT_APP_API_TRAFIKLAB_REALTIMEDEPARTURES_KEY;

    findStation(searchString: string, success: (data: IFindStationResponse) => void, error?: (message: string) => void, final?: () => void) {
        this.get(`${this.findStationUrl}?key=${this.findStationKey}&searchstring=${searchString}&stationsonly=true&maxresults=1`, success, error, final);
    }

    getRealTimeDepartures(siteId: number, timeWindow: number, success: (data: IRealTimeDeparturesResponse) => void, error?: (message: string) => void, final?: () => void) {
        this.get(`${this.realTimeApiUrl}?key=${this.realTimeApiKey}&siteid=${siteId}&timewindow=${timeWindow}`, success, error, final);
    }
}