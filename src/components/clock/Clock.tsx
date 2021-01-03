import moment from 'moment';
import 'moment/locale/sv'
import * as React from 'react';

export const Clock: React.FunctionComponent = () => {

    const [date, setDate] = React.useState<string>("...");
    const [time, setTime] = React.useState<string>("...");

    React.useEffect(() => {
        moment.locale('sv');
        setInterval(() => {
            let timestamp = moment();
            setDate(timestamp.format("Do MMMM YYYY"));
            setTime(timestamp.format("HH:mm"));
        }, 1000);
    }, []);

    return (
        <>
            <div className="clock">
                <div className="row">
                    <div className="col-12 clock-date">{date}</div>
                </div>
                <div className="row">
                    <div className="col-12 clock-time">{time}</div>
                </div>
            </div>
        </>
    );
}