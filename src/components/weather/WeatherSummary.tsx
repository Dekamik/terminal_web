import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment-timezone';
import * as React from 'react';
import { ITimeseriesItem, IYRLocationForecastResponse } from '../../api/YR/IYRLocationForecastResponse';
import { YRApi } from '../../api/YR/YRApi';
import { toCamelCase } from '../../helpers/StringHelper';
import { Spinner } from '../common/Spinner';
import { Temperature } from '../common/Temperature';
import { IWeatherDayForecastTableItem } from './WeatherDayForecastTable';
import { IWeatherLongtermForecastTableItem } from './WeatherLongtermForecastTable';
import { WeatherModal } from './WeatherModal';

interface IWeatherSummary {
    name: string;
    lat: number;
    lon: number;
    height: number;
}

export const WeatherSummary: React.FunctionComponent<IWeatherSummary> = (props) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [temperature, setTemperature] = React.useState<number>();
    const [weatherCode, setWeatherCode] = React.useState<string>();
    const [weatherModalDayForecast, setWeatherDayForecast] = React.useState<IWeatherDayForecastTableItem[]>();
    const [weatherModalLongtermForecast, setWeatherLongtermForecast] = React.useState<IWeatherLongtermForecastTableItem[]>();

    const getSixHourIncrements = (data?: IYRLocationForecastResponse, withTimezone: boolean = false) => 
        withTimezone
            ? data?.properties.timeseries.filter(item => [0, 6, 12, 18].indexOf(moment(item.time).tz('Europe/Stockholm').hour()) !== -1)
            : data?.properties.timeseries.filter(item => [0, 6, 12, 18].indexOf(moment(item.time).utc().hour()) !== -1)

    const updateModalData = React.useCallback((data?: IYRLocationForecastResponse) => {
        let dayForecast = getSixHourIncrements(data, true)?.map(item => 
            ({
                time: moment(item.time).format("HH:mm"),
                symbolCode: item.data.next_6_hours?.summary.symbol_code || "",
                temperature: item.data.instant.details.air_temperature,
                precipitation: item.data.next_6_hours?.details.precipitation_amount || 0,
                wind: item.data.instant.details.wind_speed
            })
        );

        if (dayForecast) {
            dayForecast.length = 4;
        }

        let longtermForecastRawData = getSixHourIncrements(data);
        let longtermForecast: IWeatherLongtermForecastTableItem[] = [];

        const getSymbolForTime = (from: ITimeseriesItem, to: IWeatherLongtermForecastTableItem) => {
            switch (moment(from.time).utc().hour()) {
                case 0:
                    return to.symbolCode0000 = from.data.next_6_hours?.summary.symbol_code 
                        || from.data.next_1_hours?.summary.symbol_code
                        || from.data.next_12_hours?.summary.symbol_code
                        || "";

                case 6:
                    return to.symbolCode0600 = from.data.next_6_hours?.summary.symbol_code 
                        || from.data.next_1_hours?.summary.symbol_code
                        || from.data.next_12_hours?.summary.symbol_code
                        || "";

                case 12:
                    return to.symbolCode1200 = from.data.next_6_hours?.summary.symbol_code 
                        || from.data.next_1_hours?.summary.symbol_code
                        || from.data.next_12_hours?.summary.symbol_code
                        || "";

                case 18:
                    return to.symbolCode1800 = from.data.next_6_hours?.summary.symbol_code
                        || from.data.next_1_hours?.summary.symbol_code
                        || from.data.next_12_hours?.summary.symbol_code
                        || "";
                
                default:
                    return "";
            }
        }

        if (longtermForecastRawData) {
            for (let item of longtermForecastRawData) {
                let dateStr = moment(item.time).format("dddd D/M");
                let dateExists = longtermForecast.filter(item => item.dateStr === dateStr)[0] != null;

                if (!dateExists) {
                    longtermForecast = [
                        ...longtermForecast,
                        {
                            date: item.time,
                            dateStr: dateStr,
                            isRedDay: false,
                            temperature: item.data.instant.details.air_temperature,
                            precipitation: 0,
                            wind: item.data.instant.details.wind_speed
                        }
                    ]
                }
                longtermForecast.filter(item => item.dateStr === dateStr)[0].precipitation += item.data.next_6_hours?.details.precipitation_amount || 0;
                getSymbolForTime(item, longtermForecast.filter(item => item.dateStr === dateStr)[0]);
            }
        }

        setWeatherDayForecast(dayForecast);
        setWeatherLongtermForecast(longtermForecast);
    }, []);

    React.useEffect(() => {
        function updateWeather() {
            let api = new YRApi();

            api.locationForecast(props.lat, props.lon, props.height,
                (data: IYRLocationForecastResponse) => {
                    setTemperature(data.properties.timeseries[0].data.instant.details.air_temperature);
                    setWeatherCode(data.properties.timeseries[0].data.next_1_hours?.summary.symbol_code);
                    updateModalData(data);
                },
                (message: string) => {
                    console.log(message);
                }, 
                () => {
                    setIsLoading(false);
                }
            );
        };

        updateWeather();

        let weatherUpdateInterval = setInterval(() => {
            updateWeather();
        }, 300000);

        return function cleanup() {
            clearInterval(weatherUpdateInterval);
        };
    }, [props.lat, props.lon, props.height, updateModalData]);

    return (
        <Spinner isLoading={isLoading}>
            <div className="weather-summary"
                data-toggle="modal"
                data-target={`#${toCamelCase(props.name)}WeatherModal`}>
                <h1>
                    {props.name}
                </h1>
                <Temperature temperature={temperature} />
                <div className="weather-icon">
                {
                    weatherCode 
                        ? <img className="filter-white" src={"/images/weathericons/" + weatherCode + ".svg"} alt={weatherCode} />
                        : <FontAwesomeIcon icon={faExclamationTriangle} className="text-warning"/>
                }
                </div>
            </div>
            <WeatherModal id={`${toCamelCase(props.name)}WeatherModal`}
                locationName={props.name} 
                dayForecast={weatherModalDayForecast}
                longtermForecast={weatherModalLongtermForecast} />
        </Spinner>
    );
}