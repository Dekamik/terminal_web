import * as React from 'react';
import { ITimeseriesItem, IYRLocationForecastResponse } from '../../api/YR/IYRLocationForecastResponse';
import { YRApi } from '../../api/YR/YRApi';
import { WeatherModal } from './WeatherModal';
import { IWeatherDayForecastTableItem } from './WeatherDayForecastTable';
import { WeatherSummary } from './WeatherSummary';
import { IWeatherLongtermForecastTableItem } from './WeatherLongtermForecastTable';
import moment from 'moment-timezone';

interface ILocationData {
    lat: number;
    lon: number;
    height: number;
}

export const WeatherSummaries: React.FunctionComponent = () => {

    const [forecastStoraUrsvik, setForecastStoraUrsvik] = React.useState<IYRLocationForecastResponse>();
    const [forecastVisby, setForecastVisby] = React.useState<IYRLocationForecastResponse>();
    const [forecastVängsö, setForecastVängsö] = React.useState<IYRLocationForecastResponse>();

    const [weatherModalName, setWeatherModalName] = React.useState<string>();
    const [weatherModalDayForecast, setWeatherDayForecast] = React.useState<IWeatherDayForecastTableItem[]>();
    const [weatherModalLongtermForecast, setWeatherLongtermForecast] = React.useState<IWeatherLongtermForecastTableItem[]>();

    React.useEffect(() => {
        function updateWeather() {
            let api = new YRApi();
            let storaUrsvik: ILocationData = {lat: 59.384872, lon: 17.947649, height: 33};
            let visby: ILocationData = {lat: 57.638437, lon: 18.298376, height: 22};
            let vängsö: ILocationData = {lat: 59.103409, lon: 17.218876, height: 16};

            api.locationForecast(storaUrsvik.lat, storaUrsvik.lon, storaUrsvik.height,
                (data: IYRLocationForecastResponse) => {
                    setForecastStoraUrsvik(data);
                },
                (message: string) => {
                    console.log(message);
                });
            
            api.locationForecast(visby.lat, visby.lon, visby.height,
                (data: IYRLocationForecastResponse) => {
                    setForecastVisby(data);
                },
                (message: string) => {
                    console.log(message);
                });
            
            api.locationForecast(vängsö.lat, vängsö.lon, vängsö.height,
                (data: IYRLocationForecastResponse) => {
                    setForecastVängsö(data);
                },
                (message: string) => {
                    console.log(message);
                });
        };

        updateWeather();

        let weatherUpdateInterval = setInterval(() => {
            updateWeather();
        }, 300000);

        return function cleanup() {
            clearInterval(weatherUpdateInterval);
        };
    }, []);

    const getSixHourIncrements = (data?: IYRLocationForecastResponse, withTimezone: boolean = false) => 
        withTimezone
            ? data?.properties.timeseries.filter(item => [0, 6, 12, 18].indexOf(moment(item.time).tz('Europe/Stockholm').hour()) !== -1)
            : data?.properties.timeseries.filter(item => [0, 6, 12, 18].indexOf(moment(item.time).utc().hour()) !== -1)

    const changeModalData = (name: string, data?: IYRLocationForecastResponse) => {
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

        setWeatherModalName(name);
        setWeatherDayForecast(dayForecast);
        setWeatherLongtermForecast(longtermForecast);
    }

    return (
        <div className="row">
            <div className="col-4" 
                onClick={() => changeModalData("Vängsö", forecastVängsö)}
                data-toggle="modal"
                data-target="#weatherModal">
                <WeatherSummary name="Vängsö" 
                    temperature={forecastVängsö?.properties.timeseries[0].data.instant.details.air_temperature} 
                    weatherCode={forecastVängsö?.properties.timeseries[0].data.next_1_hours?.summary.symbol_code} />
            </div>
            <div className="col-4" 
                onClick={() => changeModalData("Stora Ursvik", forecastStoraUrsvik)}
                data-toggle="modal"
                data-target="#weatherModal">
                <WeatherSummary name="Stora Ursvik" 
                    temperature={forecastStoraUrsvik?.properties.timeseries[0].data.instant.details.air_temperature} 
                    weatherCode={forecastStoraUrsvik?.properties.timeseries[0].data.next_1_hours?.summary.symbol_code} />
            </div>
            <div className="col-4" 
                onClick={() => changeModalData("Visby", forecastVisby)}
                data-toggle="modal"
                data-target="#weatherModal">
                <WeatherSummary name="Visby" 
                    temperature={forecastVisby?.properties.timeseries[0].data.instant.details.air_temperature} 
                    weatherCode={forecastVisby?.properties.timeseries[0].data.next_1_hours?.summary.symbol_code} />
            </div>
            <WeatherModal id="weatherModal" 
                locationName={weatherModalName} 
                dayForecast={weatherModalDayForecast}
                longtermForecast={weatherModalLongtermForecast} />
        </div>
    );
}