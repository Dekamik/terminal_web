import * as React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

export const SLTravelPlanner: React.FunctionComponent = () => {
    return (
        <div className="col-12">
            <form>
                <div className="row">
                    <div className="col-6 mx-auto searchbar">
                        <Typeahead options={["a", "b", "c"]} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                    </div>
                    <div className="col-8">

                    </div>
                </div>
                <div className="row">
                    <hr />
                </div>
            </form>
        </div>
    );
}
