import { Api } from "../Api";
import { Moment } from "moment";
import { IDaysResponse } from "./IDaysResponse";

export class SHolidayApi extends Api {
    daysUrl = process.env.REACT_APP_API_SHOLIDAY_DAYS_URL;

    days(date: Moment, success: (response: IDaysResponse) => void, error?: (message: string) => void, final?: () => void) {
        this.get(`${this.daysUrl}/${date.format("YYYY")}`, success, error, final);
    }
}