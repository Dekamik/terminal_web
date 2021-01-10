import { Api } from "../Api";
import { IYRLocationForecastResponse } from "./IYRLocationForecastResponse";

export class YRApi extends Api {
    locationForecastUrl = process.env.REACT_APP_API_YR_LOCATIONFORECAST_URL;

    locationForecast(lat: number, lon: number, msl: number, success: (data: IYRLocationForecastResponse) => void, error?: (message: string) => void, final?: () => void) {
        this.get(`${this.locationForecastUrl}?lat=${lat}&lon=${lon}&altitude=${msl}`, success, error, final);
    }
}