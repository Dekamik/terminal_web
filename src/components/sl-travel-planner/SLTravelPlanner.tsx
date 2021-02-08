import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import { Typeahead } from 'react-bootstrap-typeahead';
import moment from 'moment';
import { Data } from '../../api/TrafikLab/DefaultLineDataResponse';
import { Spinner } from '../common/Spinner';
import { contains } from '../../helpers/StringHelper';

enum DepartOption {
    Now,
    DepartAt,
    ArriveAt
}

interface IOption {
    id: string,
    label: string
}

export const SLTravelPlanner: React.FunctionComponent = () => {

    const [loadingOptions, setLoadingOptions] = React.useState<boolean>(true);
    const [options, setOptions] = React.useState<IOption[]>();

    const [selectedDeparture, setSelectedDeparture] = React.useState<IOption[]>();
    const [selectedDestination, setSelectedDestination] = React.useState<IOption[]>();
    const [departOption, setDepartOption] = React.useState<DepartOption>(DepartOption.Now);
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
    
    const getOptions = () => Data.ResponseData.Result
        .map(item => ({id: item.SiteId, label: `${item.SiteName} [${item.SiteId}]`}))
        .filter((value, index, self) => self.map(x => x.id).indexOf(value.id) === index);

    React.useEffect(() => {
        setLoadingOptions(true);
        setOptions(getOptions());
        setLoadingOptions(false);
    }, []);

    const searchDepartures = () => {
        console.log("selectedDeparture", selectedDeparture && selectedDeparture[0]);
        console.log("selectedDestination", selectedDestination && selectedDestination[0]);
        console.log("departOption", departOption);
        console.log("dateTime", dateTime);
    }

    return (
        <div className="col-8 mx-auto">
            <h1 className="text-center">SL Reseplanerare</h1>
            <div className="row">
                <hr/>
            </div>
            <Spinner isLoading={loadingOptions}>
                <div className="row">
                    <div className="col mx-auto">
                        <Typeahead 
                            id="departure"
                            clearButton
                            options={options ?? []} 
                            placeholder="Ange utgångspunkt..."
                            size="large"
                            minLength={3}
                            selected={selectedDeparture}
                            onChange={setSelectedDeparture}
                            defaultSelected={options?.filter(value => value.id === "3522")}
                        />
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col mx-auto">
                        <Typeahead 
                            id="destination"
                            clearButton
                            options={options ?? []} 
                            placeholder="Ange destination..."
                            size="large"
                            minLength={3}
                            selected={selectedDestination}
                            onChange={setSelectedDestination}
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
                            <div className="tab-pane fade show active" id="depart-now" role="tabpanel" aria-labelledby="depart-now-tab" onClick={() => setDepartOption(DepartOption.Now)}></div>
                            <div className="tab-pane fade" id="depart-at" role="tabpanel" aria-labelledby="depart-at-tab" onClick={() => setDepartOption(DepartOption.DepartAt)}>
                                {datePicker()}
                            </div>
                            <div className="tab-pane fade" id="arrive-at" role="tabpanel" aria-labelledby="arrive-at-tab" onClick={() => setDepartOption(DepartOption.ArriveAt)}>
                                {datePicker()}
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-4 mx-auto">
                        <button className="btn btn-info btn-lg btn-block" onClick={() => searchDepartures()} ><FontAwesomeIcon icon={faSearch} /> Sök</button>
                    </div>
                </div>
            </Spinner>
        </div>
    );
}
