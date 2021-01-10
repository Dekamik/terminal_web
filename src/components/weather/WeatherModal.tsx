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
            <ul className="nav nav-pills nav-fill font-size-1-25" id={`${props.id}WeatherTabs`} role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id={`${props.id}DayTab`} data-toggle="tab" href={`#${props.id}Day`} role="tab" aria-controls={`${props.id}Day`} aria-selected="true">
                        Kommande dygn
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id={`${props.id}LongTab`} data-toggle="tab" href={`#${props.id}Long`} role="tab" aria-controls={`${props.id}Long`} aria-selected="false">
                        Lång sikt
                    </a>
                </li>
            </ul>
            <div className="tab-content" id={`${props.id}WeatherTabContent`}>
                <div className="tab-pane fade show active" id={`${props.id}Day`} role="tabpanel" aria-labelledby={`${props.id}DayTab`}>
                    <WeatherDayForecastTable forecast={props.dayForecast} />
                </div>
                <div className="tab-pane fade" id={`${props.id}Long`} role="tabpanel" aria-labelledby={`${props.id}LongTab`}>
                    <WeatherLongtermForecastTable forecast={props.longtermForecast} />
                </div>
            </div>
        </SingleButtonModal>
    );
}