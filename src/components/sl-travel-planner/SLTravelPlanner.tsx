import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import { Typeahead } from 'react-bootstrap-typeahead';
import moment from 'moment';

export const SLTravelPlanner: React.FunctionComponent = () => {

    const [dateTime, setDateTime] = React.useState<Date>(new Date());

    const datePicker = () => 
        <DatePicker className="form-control"
            todayButton="Idag"
            showTimeSelect
            timeIntervals={15}
            locale="sv"
            showWeekNumbers
            value={moment(dateTime).format("YYYY-MM-DD HH:mm")}
            onChange={date => date && date instanceof Date && setDateTime(date)} />

    return (
        <div className="col-8 mx-auto">
            <h1 className="text-center">SL Reseplanerare</h1>
            <form>
                <div className="row">
                    <hr/>
                </div>
                <div className="row">
                    <div className="col mx-auto">
                        <Typeahead 
                            options={["a", "b", "c"]} 
                            placeholder="Ange destination..."
                            size="large"
                            minLength={3}
                        />
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-7">
                        <ul className="nav nav-pills nav-fill mb-3" id="depart-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="depart-now-tab" data-toggle="pill" href="#depart-now" role="tab" aria-controls="depart-now" aria-selected="true">Åka nu</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="depart-at-tab" data-toggle="pill" href="#depart-at" role="tab" aria-controls="depart-now" aria-selected="false">Avgångstid</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="arrive-at-tab" data-toggle="pill" href="#arrive-at" role="tab" aria-controls="depart-now" aria-selected="false">Ankomsttid</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-5">
                        <div className="tab-content" id="depart-tab-content">
                            <div className="tab-pane fade show active" id="depart-now" role="tabpanel" aria-labelledby="depart-now-tab"></div>
                            <div className="tab-pane fade" id="depart-at" role="tabpanel" aria-labelledby="depart-at-tab">
                                {datePicker()}
                            </div>
                            <div className="tab-pane fade" id="arrive-at" role="tabpanel" aria-labelledby="arrive-at-tab">
                                {datePicker()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 mx-auto">
                        <button className="btn btn-info btn-lg btn-block"><FontAwesomeIcon icon={faSearch} /> Sök</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
