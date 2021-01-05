import { Api } from '../Api';
import { IRealTimeDeparturesResponse } from './IRealTimeDeparturesResponse';

export class TrafikLabApi extends Api {
    realTimeApiUrl = process.env.REACT_APP_API_TRAFIKLAB_REALTIMEDEPARTURES_URL;
    realTimeApiKey = process.env.REACT_APP_API_TRAFIKLAB_REALTIMEDEPARTURES_KEY;

    getRealTimeDepartures(siteId: number, timeWindow: number, success: (data: IRealTimeDeparturesResponse) => void, error?: (message: string) => void, final?: () => void) {
        this.get(`${this.realTimeApiUrl}?key=${this.realTimeApiKey}&siteid=${siteId}&timewindow=${timeWindow}`, success, error, final);
    }
}