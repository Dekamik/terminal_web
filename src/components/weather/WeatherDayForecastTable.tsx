import { faClock, faCloudSunRain, faTemperatureHigh, faTemperatureLow, faUmbrella, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import * as React from 'react';

export interface IWeatherDayForecastTableItem {
    time: Date;
    symbolCode: string;
    highestTemp: number;
    lowestTemp: number;
    precipitation: number;
    wind: number;
}

interface IWeatherDayForecastTable {
    forecast?: IWeatherDayForecastTableItem[];
}

export const WeatherDayForecastTable: React.FunctionComponent<IWeatherDayForecastTable> = (props) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <td scope="col"><FontAwesomeIcon icon={faClock} /></td>
                    <td scope="col"><FontAwesomeIcon icon={faCloudSunRain} /></td>
                    <td scope="col"><FontAwesomeIcon icon={faTemperatureHigh} />C</td>
                    <td scope="col"><FontAwesomeIcon icon={faTemperatureLow} />C</td>
                    <td scope="col"><FontAwesomeIcon icon={faUmbrella} /></td>
                    <td scope="col"><FontAwesomeIcon icon={faWind} /></td>
                </tr>
            </thead>
            <tbody>
                {
                    props.forecast && props.forecast.length
                        ? props.forecast.map((item, i) => 
                        <tr>
                            <td>{moment(item.time).format("HH:mm")}</td>
                            <td><img className="filter-black" src={"/images/weathericons/" + item.symbolCode + ".svg"} alt={item.symbolCode} /></td>
                            <td>{item.highestTemp}°</td>
                            <td>{item.lowestTemp}°</td>
                            <td>{item.precipitation} mm</td>
                            <td>{item.wind} m/s</td>
                        </tr>
                        )
                        : <tr><td className="text-center" colSpan={6}>Väderleksrapport ej tillgänglig</td></tr>
                }
            </tbody>
        </table>
    );
}
