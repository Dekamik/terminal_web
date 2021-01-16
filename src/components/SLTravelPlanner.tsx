import * as React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { Input, InputType } from './common/form/Input';
import { Size } from './common/Size';

export const SLTravelPlanner: React.FunctionComponent = () => {
    return (
        <div className="col-12">
            <form>
                <div className="row">
                    <div className="col-6 mx-auto searchbar">
                        <Input id="searchbar" type={InputType.Text} placeholder="Ange destination" size={Size.Large}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <DatePicker
                            defaultValue={new Date().toISOString()}
                        />
                    </div>
                    <div className="col-8">

                    </div>
                </div>
            </form>
        </div>
    );
}
