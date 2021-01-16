import { faClock, faCloudSunRain, faTemperatureHigh, faUmbrella, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Temperature } from '../common/Temperature';

export interface IWeatherDayForecastTableItem {
    time: string;
    symbolCode: string;
    temperature: number;
    precipitation: number;
    wind: number;
}

interface IWeatherDayForecastTable {
    forecast?: IWeatherDayForecastTableItem[];
}

export const WeatherDayForecastTable: React.FunctionComponent<IWeatherDayForecastTable> = (props) => {
    return (
        <table className="table table-dark text-center font-size-1-5">
            <thead>
                <tr>
                    <th><FontAwesomeIcon icon={faClock} /></th>
                    <th><FontAwesomeIcon icon={faCloudSunRain} /></th>
                    <th><FontAwesomeIcon icon={faTemperatureHigh} />C</th>
                    <th><FontAwesomeIcon icon={faUmbrella} /></th>
                    <th><FontAwesomeIcon icon={faWind} /></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.forecast && props.forecast.length
                        ? props.forecast.map((item, i) => 
                            <tr key={i}>
                                <td className="align-middle">{item.time}</td>
                                <td className="align-middle"><img className="filter-white weather-table-icon-sm" src={"/images/weathericons/" + item.symbolCode + ".svg"} alt={item.symbolCode} /></td>
                                <td className="align-middle"><Temperature temperature={item.temperature} /></td>
                                <td className="align-middle">{item.precipitation !== 0 ? `${item.precipitation} mm` : "-"}</td>
                                <td className="align-middle">{item.wind} m/s</td>
                            </tr>)
                        : <tr><td className="text-center" colSpan={6}>Väderleksrapport ej tillgänglig</td></tr>
                }
            </tbody>
        </table>
    );
}
