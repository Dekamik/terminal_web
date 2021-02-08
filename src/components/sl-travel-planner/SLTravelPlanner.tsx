import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import { Typeahead } from 'react-bootstrap-typeahead';
import moment from 'moment';
import { Data } from '../../api/TrafikLab/DefaultLineDataResponse';
import { Spinner } from '../common/Spinner';

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
    const [selection, setSelection] = React.useState<IOption>();
    const [options, setOptions] = React.useState<IOption[]>();
    const [dateTime, setDateTime] = React.useState<Date>(new Date());
    const [departOption, setDepartOption] = React.useState<DepartOption>(DepartOption.Now);

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
        .map(item => ({id: item.SiteId, label: item.SiteName}))
        .filter((value, index, self) => self.map(x => x.id).indexOf(value.id) === index);

    React.useEffect(() => {
        setLoadingOptions(true);
        setOptions(getOptions());
        setLoadingOptions(false);
    }, []);

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
                            clearButton
                            options={options ?? []} 
                            placeholder="Ange destination..."
                            size="large"
                            minLength={3}
                            onInputChange={text => setSelection(options?.filter(value => value.label === text)[0])}
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
                        <button className="btn btn-info btn-lg btn-block"><FontAwesomeIcon icon={faSearch} onClick={() => true} /> Sök</button>
                    </div>
                </div>
            </Spinner>
        </div>
    );
}
