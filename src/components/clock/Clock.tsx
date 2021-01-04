import moment from 'moment';
import 'moment/locale/sv'
import * as React from 'react';
import { IDaysResponse } from '../../api/SHoliday/IDaysResponse';
import { SHolidayApi } from '../../api/SHoliday/SHolidayApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import * as schedule from 'node-schedule';

export const Clock: React.FunctionComponent = () => {
    
    const [date, setDate] = React.useState<string>("...");
    const [time, setTime] = React.useState<string>("...");
    const [flagDay, setFlagDay] = React.useState<string>("");
    const [isRedDay, setIsRedDay] = React.useState<boolean>(false);
    const [nameDays, setNameDays] = React.useState<string[]>([]);

    React.useEffect(() => {
        // Read environment variables
        let dateFormat = process.env.REACT_APP_CLOCK_DATE_FORMAT;
        let timeFormat = process.env.REACT_APP_CLOCK_TIME_FORMAT;
        let locale = process.env.REACT_APP_LANGUAGE;

        function updateDate() {
            let api = new SHolidayApi();
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
        };

        function updateTime() {
            setTime(moment().format(timeFormat));
        };

        // Initial update
        moment.locale(locale);
        updateTime();
        updateDate();

        // Update clock every second
        let clockInterval = setInterval(() => {
            updateTime();
        }, 1000);

        // Update date at midnight
        schedule.scheduleJob('0 0 * * *', () => {
            updateDate();
        });

        // Remove interval when unmounting so they don't pile up
        return function cleanup() {
            clearInterval(clockInterval);
        };
    }, []);

    return (
        <div className="clock">
            <div className="row">
                <div className={"col-12 clock-date" + (isRedDay ? " text-magenta" : "")}>{date}</div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="clock-time">{time}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="clock-names discreet">
                        {nameDays.join(" ")} {flagDay ? <FontAwesomeIcon icon={faFlag} /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}