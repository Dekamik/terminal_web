import * as React from 'react';

export const Clock: React.FunctionComponent = () => {

    return (
        <>
            <div className="col-12 clock">
                <div className="row">
                    <div className="col-12 clock-date">3:e januari 2021</div>
                </div>
                <div className="row">
                    <div className="col-12 clock-time">12:34</div>
                </div>
            </div>
        </>
    );
}