import * as React from 'react';
import { Color } from './Color';

interface ISpinner {
    isLoading: boolean;
    color?: Color;
}

export const Spinner: React.FunctionComponent<ISpinner> = (props) => {
    return (
        props.isLoading
            ? <div className={`spinner-loader text-${props.color || Color.White}`} role="status">
                <span className="sr-only">Laddar...</span>
            </div>
            : <>
                {props.children}
            </>
    );
}