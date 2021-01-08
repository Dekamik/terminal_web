import * as React from 'react';
import { IYRLocationForecastResponse } from '../../api/YR/IYRLocationForecastResponse';
import { YRApi } from '../../api/YR/YRApi';
import { WeatherModal } from './WeatherModal';
import { IWeatherDayForecastTableItem } from './WeatherDayForecastTable';
import { WeatherSummary } from './WeatherSummary';
import { IWeatherLongtermForecastTableItem } from './WeatherLongtermForecastTable';

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

    const changeModalData = (name: string, data?: IYRLocationForecastResponse) => {
        setWeatherModalName(name);
        
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