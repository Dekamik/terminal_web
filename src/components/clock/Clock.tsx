import moment from 'moment';
import 'moment/locale/sv'
import * as React from 'react';
import { IDaysResponse } from '../../api/SHoliday/IDaysResponse';
import { SHolidayApi } from '../../api/SHoliday/SHolidayApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

export const Clock: React.FunctionComponent = () => {
    const dateFormat = process.env.REACT_APP_DATE_TEXT_FORMAT;
    const timeFormat = process.env.REACT_APP_TIME_FORMAT;
    const locale = process.env.REACT_APP_LOCALE;
    
    const [date, setDate] = React.useState<string>("...");
    const [time, setTime] = React.useState<string>("...");
    const [flagDay, setFlagDay] = React.useState<string>("");
    const [isRedDay, setIsRedDay] = React.useState<boolean>(false);
    const [nameDays, setNameDays] = React.useState<string[]>([]);

    const api = React.useMemo(() => {
        return new SHolidayApi();
    }, []);

    const updateDate = React.useCallback(() => {
        let currentTime = moment();
        setDate(currentTime.format(dateFormat));

        api.days(currentTime,
        (response: IDaysResponse) => {
            let day = response.dagar[0];
            setFlagDay(day.flaggdag);
            setIsRedDay(day["röd dag"] === "Ja");
            setNameDays(day.namnsdag);
        },
        (message: string) => {
            console.log(message);
        });
    }, [dateFormat, api]);

    const updateTime = React.useCallback(() => {
        let currentTime = moment();
        setTime(currentTime.format(timeFormat));

        if (currentTime.format(dateFormat) !== date) {
            updateDate();
        }
    }, [dateFormat, timeFormat, date, updateDate]);

    React.useEffect(() => {
        moment.locale(locale);

        updateTime();
        updateDate();

        setInterval(() => {
            updateTime();
        }, 1000);
    }, [locale, updateDate, updateTime]);

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
                        <div className="col-12 clock-flagday">{<FontAwesomeIcon icon={faFlag} />} {flagDay}</div>
                    </div>
                    : null
            }
        </div>
    );
}