import moment from 'moment';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { roundNumber } from '../../helpers/NumberHelper';
import { capitalize } from '../../helpers/StringHelper';
import { RootState } from '../../store';
import { Temperature } from '../common/Temperature';

export interface IWeatherLongtermForecastTableItem {
    date: Date;
    dateStr: string;
    isRedDay: boolean;
    temperature: number;
    precipitation: number;
    wind: number;
    symbolCode0000?: string;
    symbolCode0600?: string;
    symbolCode1200?: string;
    symbolCode1800?: string;
}

interface IWeatherLongtermForecastTable {
    forecast?: IWeatherLongtermForecastTableItem[];
}

export const WeatherLongtermForecastTable: React.FunctionComponent<IWeatherLongtermForecastTable> = (props) => {

    const calendarState = useSelector((state: RootState) => state.calendar);

    const isRedDay = (date: Date) => {
        let result = calendarState.calendar.filter(item => item.datum === moment(date).format("YYYY-MM-DD"))[0];
        if (result) {
            return result['röd dag'] === 'Ja'
        }
        return false;
    }

    return (
        <table className="table table-dark">
            <thead className="text-center font-size-1-5">
                <tr>
                    <th colSpan={2}></th>
                    <th>00:00</th>
                    <th>06:00</th>
                    <th>12:00</th>
                    <th>18:00</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.forecast && props.forecast.length
                        ? props.forecast.map((item, i) => 
                        <tr key={i}>
                            <td colSpan={2}>
                                <div className="col-12">
                                    <div className={`row ${isRedDay(item.date) ? "text-magenta" : ""}`}>
                                        {capitalize(item.dateStr)}
                                    </div>
                                    <div className="row font-size-2">
                                        <Temperature temperature={item.temperature} />
                                    </div>
                                    {
                                        item.precipitation
                                            ? <div className="row text-blue">
                                                {roundNumber(item.precipitation)} mm
                                            </div>
                                            : null
                                    }
                                    <div className="row">
                                        {item.wind} m/s
                                    </div>
                                </div>
                            </td>
                            <td className="text-center">{item.symbolCode0000 ? <img className="filter-white" src={"/images/weathericons/" + item.symbolCode0000 + ".svg"} alt={item.symbolCode0000} /> : null}</td>
                            <td className="text-center">{item.symbolCode0600 ? <img className="filter-white" src={"/images/weathericons/" + item.symbolCode0600 + ".svg"} alt={item.symbolCode0600} /> : null}</td>
                            <td className="text-center">{item.symbolCode1200 ? <img className="filter-white" src={"/images/weathericons/" + item.symbolCode1200 + ".svg"} alt={item.symbolCode1200} /> : null}</td>
                            <td className="text-center">{item.symbolCode1800 ? <img className="filter-white" src={"/images/weathericons/" + item.symbolCode1800 + ".svg"} alt={item.symbolCode1800} /> : null}</td>
                        </tr>
                        )
                        : <tr><td className="text-center" colSpan={6}>Väderleksrapport ej tillgänglig</td></tr>
                }
            </tbody>
        </table>
    );
}