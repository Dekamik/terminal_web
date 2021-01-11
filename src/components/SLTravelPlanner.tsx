import * as React from 'react';
import { Input, InputType } from './common/form/Input';

export const SLTravelPlanner: React.FunctionComponent = () => {
    return (
        <div className="col-12">
            <form>
                <div className="col-6 mx-auto searchbar">
                    <Input id="searchbar" type={InputType.Text} />
                </div>
            </form>
        </div>
    );
}
