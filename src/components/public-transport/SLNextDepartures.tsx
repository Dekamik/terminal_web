import * as React from 'react';
import { LineColor, SLDeparture } from './SLDeparture';
import { SLMode } from './SLModes';

interface ISLNextDepartures {
    stopName: string;
}

export const SLNextDepartures: React.FunctionComponent<ISLNextDepartures> = (props) => {

    return (
        <div className="col-12 sl-next-departures">
            <h2 className="text-center">SL - {props.stopName}</h2>
            <table className="table table-dark table-sm table-borderless">
                <tbody>
                    <SLDeparture mode={SLMode.Bus} line="504" endStation="Sundbybergs station" departsAt="Nu" color={LineColor.Red} />
                    <SLDeparture mode={SLMode.Bus} line="504" endStation="Rissne" departsAt="7 min" color={LineColor.Red}/>
                    <SLDeparture mode={SLMode.Bus} line="504" endStation="Sundbybergs station" departsAt="15 min" color={LineColor.Red}/>
                    <SLDeparture mode={SLMode.Bus} line="504" endStation="Rissne" departsAt="22 min" color={LineColor.Red}/>
                </tbody>
            </table>
        </div>
    );
}