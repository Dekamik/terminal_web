import * as React from 'react';
import { Color } from '../Color';
import { Size } from '../Size';

export enum InputType {
    Text = "text",
    Password = "password"
}

interface IInput {
    id: string;
    type: InputType;
    label?: string;
    placeholder?: string;
    size?: Size;
    bgColor?: Color;
    fgColor?: Color;
}

export const Input: React.FunctionComponent<IInput> = (props) => {
    const renderInput = () => 
        <input id={props.id}
            type={props.type} 
            className={`form-control ${props.size === Size.Normal ? "" : `form-control-${props.size}`} bg-${props.bgColor || Color.Dark} text-${props.fgColor || Color.White}`} 
            placeholder={props.placeholder} />

    return (
        props.label
            ? <div className="form-group">
                <label htmlFor={props.id} 
                    className={`col-4 col-form-label ${props.size === Size.Normal ? "" : `col-form-label-${props.size}`}`}>
                    {props.label}
                </label>
                <div className="col-8">
                    {renderInput()}
                </div>
            </div>
            : renderInput()
    );
}
