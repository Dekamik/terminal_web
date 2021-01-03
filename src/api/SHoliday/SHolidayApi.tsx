import { Api } from "../Api";
import { Moment } from "moment";
import { IDaysResponse } from "./IDaysResponse";

export class SHolidayApi extends Api {
    url = process.env.REACT_APP_API_SHOLIDAY_URL;
    version = process.env.REACT_APP_API_SHOLIDAY_VERSION;

    days(date: Moment, success: (response: IDaysResponse) => void, error?: (message: string) => void, final?: () => void) {
        this.get(`${this.url}/dagar/${this.version}/${date.format("YYYY/MM/DD")}`, success, error, final);
    }
}