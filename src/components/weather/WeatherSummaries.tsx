import * as React from 'react';
import { IYRLocationForecastResponse } from '../../api/YR/IYRLocationForecastResponse';
import { YRApi } from '../../api/YR/YRApi';
import { WeatherSummary } from './WeatherSummary';

interface ILocationData {
    lat: number;
    lon: number;
    height: number;
}

export const WeatherSummaries: React.FunctionComponent = () => {

    const [forecastStoraUrsvik, setForecastStoraUrsvik] = React.useState<IYRLocationForecastResponse>();
    const [forecastVisby, setForecastVisby] = React.useState<IYRLocationForecastResponse>();
    const [forecastVängsö, setForecastVängsö] = React.useState<IYRLocationForecastResponse>();

    const updateWeather = React.useCallback(() => {
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
    }, []);

    React.useEffect(() => {
        updateWeather();

        setInterval(() => {
            updateWeather();
        }, 600000);
    }, [updateWeather])

    return (
        <div className="row">
          <div className="col-4">
            <WeatherSummary name="Stora Ursvik" 
                temperature={forecastStoraUrsvik?.properties.timeseries[0].data.instant.details.air_temperature} 
                weatherCode={forecastStoraUrsvik?.properties.timeseries[0].data.next_1_hours?.summary.symbol_code}/>
          </div>
          <div className="col-4">
            <WeatherSummary name="Visby" 
                temperature={forecastVisby?.properties.timeseries[0].data.instant.details.air_temperature} 
                weatherCode={forecastVisby?.properties.timeseries[0].data.next_1_hours?.summary.symbol_code} />
          </div>
          <div className="col-4">
            <WeatherSummary name="Vängsö" 
                temperature={forecastVängsö?.properties.timeseries[0].data.instant.details.air_temperature} 
                weatherCode={forecastVängsö?.properties.timeseries[0].data.next_1_hours?.summary.symbol_code} />
          </div>
        </div>
    );
}