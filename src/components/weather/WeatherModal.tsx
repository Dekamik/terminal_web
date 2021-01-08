import * as React from 'react';
import { ModalSize } from '../common/modal/ModalSize';
import { SingleButtonModal } from '../common/modal/SingleButtonModal';
import { IWeatherDayForecastTableItem, WeatherDayForecastTable } from './WeatherDayForecastTable';
import { WeatherLongtermForecastTable, IWeatherLongtermForecastTableItem } from './WeatherLongtermForecastTable';

interface IWeatherModal {
    id: string;
    locationName?: string;
    dayForecast?: IWeatherDayForecastTableItem[];
    longtermForecast?: IWeatherLongtermForecastTableItem[];
}

export const WeatherModal: React.FunctionComponent<IWeatherModal> = (props) => {
    return (
        <SingleButtonModal id={props.id} 
            title={`Väderleksrapport - ${props.locationName}`}
            modalSize={ModalSize.Large}>
            <ul className="nav nav-pills nav-fill" id="weatherTabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="dayTab" data-toggle="tab" href="#day" role="tab" aria-controls="day" aria-selected="true">Day</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="longTab" data-toggle="tab" href="#long" role="tab" aria-controls="long" aria-selected="false">Long term</a>
                </li>
            </ul>
            <div className="tab-content" id="weatherTabContent">
                <div className="tab-pane fade show active" id="day" role="tabpanel" aria-labelledby="dayTab">
                    <WeatherDayForecastTable forecast={props.dayForecast} />
                </div>
                <div className="tab-pane fade" id="long" role="tabpanel" aria-labelledby="longTab">
                    <WeatherLongtermForecastTable forecast={props.longtermForecast} />
                </div>
            </div>
        </SingleButtonModal>
    );
}