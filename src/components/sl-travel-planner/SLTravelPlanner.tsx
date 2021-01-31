import * as React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

export const SLTravelPlanner: React.FunctionComponent = () => {
    return (
        <div className="col-12">
            <div className="row">
                <hr/>
            </div>
            <h1 className="text-center">SL Reseplanerare</h1>
            <form>
                <div className="row">
                    <hr/>
                </div>
                <div className="row">
                    <div className="col-8 mx-auto">
                        <Typeahead 
                            options={["a", "b", "c"]} 
                            placeholder="Ange destination..."
                            size="large"
                            minLength={3}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                    </div>
                    <div className="col-8">

                    </div>
                </div>
            </form>
        </div>
    );
}
