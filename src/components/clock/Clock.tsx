import moment from 'moment';
import 'moment/locale/sv'
import * as React from 'react';
import { IDaysResponse } from '../../api/SHoliday/IDaysResponse';
import { SHolidayApi } from '../../api/SHoliday/SHolidayApi';
import { Flag } from 'react-feather'

export const Clock: React.FunctionComponent = () => {
    
    const [date, setDate] = React.useState<string>("...");
    const [time, setTime] = React.useState<string>("...");
    const [flagDay, setFlagDay] = React.useState<string>("");
    const [isRedDay, setIsRedDay] = React.useState<boolean>(false);
    const [nameDays, setNameDays] = React.useState<string[]>([]);

    React.useEffect(() => {
        let api = new SHolidayApi();

        moment.locale('sv');

        api.days(moment(),
        (response: IDaysResponse) => {
            let day = response.dagar[0];
            setFlagDay(day.flaggdag);
            setIsRedDay(day["röd dag"] === "Ja");
            setNameDays(day.namnsdag);
        },
        (message: string) => {
            console.log(message);
        });

        setInterval(() => {
            let timestamp = moment();
            setDate(timestamp.format("Do MMMM YYYY"));
            setTime(timestamp.format("HH:mm"));
        }, 1000);
    }, []);

    return (
        <div className="clock">
            <div className="row">
                <div className={"col-12 clock-date" + (isRedDay ? " red" : "")}>{date}</div>
            </div>
            <div className="row">
                <div className="col-12 clock-time">{time}</div>
            </div>
            <div className="row">
                <div className="col-12 clock-names discreet">{nameDays.join(" ")}</div>
            </div>
            {
                flagDay.length > 0
                    ? <div className="row">
                        <div className="col-12 clock-flagday">{flagDay} {<Flag/>}</div>
                    </div>
                    : null
            }
        </div>
    );
}