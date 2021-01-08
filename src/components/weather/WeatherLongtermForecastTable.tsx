import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface IWeatherLongtermForecastTableItem {
    date: Date;
    highestTemp: number;
    lowestTemp: number;
    precipitation: number;
    wind: number;
    symbolCode0000: string;
    symbolCode0600: string;
    symbolCode1200: string;
    symbolCode1800: string;
}

interface IWeatherLongtermForecastTable {
    forecast?: IWeatherLongtermForecastTableItem[];
}

export const WeatherLongtermForecastTable: React.FunctionComponent<IWeatherLongtermForecastTable> = (props) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <td scope="col" colSpan={2}></td>
                    <td scope="col">00:00</td>
                    <td scope="col">06:00</td>
                    <td scope="col">12:00</td>
                    <td scope="col">18:00</td>
                </tr>
            </thead>
            <tbody>
                {
                    props.forecast && props.forecast.length
                        ? props.forecast.map((item, i) => 
                        <tr>
                            <td colSpan={2}>
                                <div className="col-12">
                                    <div className="row">

                                    </div>
                                    <div className="row">
                                        {item.highestTemp}° / {item.lowestTemp}°
                                    </div>
                                    {
                                        item.precipitation
                                            ? <div className="row">
                                                {item.precipitation} mm
                                            </div>
                                            : null
                                    }
                                    <div className="row">
                                        {item.wind} m/s
                                    </div>
                                </div>
                            </td>
                            <td><img className="filter-black" src={"/images/weathericons/" + item.symbolCode0000 + ".svg"} alt={item.symbolCode0000} /></td>
                            <td><img className="filter-black" src={"/images/weathericons/" + item.symbolCode0600 + ".svg"} alt={item.symbolCode0600} /></td>
                            <td><img className="filter-black" src={"/images/weathericons/" + item.symbolCode1200 + ".svg"} alt={item.symbolCode1200} /></td>
                            <td><img className="filter-black" src={"/images/weathericons/" + item.symbolCode1800 + ".svg"} alt={item.symbolCode1800} /></td>
                        </tr>
                        )
                        : <tr><td className="text-center" colSpan={6}>Väderleksrapport ej tillgänglig</td></tr>
                }
            </tbody>
        </table>
    );
}