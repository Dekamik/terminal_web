import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Color } from '../Color';
import { ModalCloseButton } from './ModalCloseButton';
import { ModalSize } from './ModalSize';

interface ISingleButtonModal {
    id: string;
    title: string;
    closeButtonText?: string;
    closeButtonColor?: Color;
    modalSize?: ModalSize;
}

export const SingleButtonModal: React.FunctionComponent<ISingleButtonModal> = (props) => {

    return (
        <div id={props.id} className="modal fade" tabIndex={-1} role="dialog" aria-hidden="true" aria-labelledby="modal-title">
            <div className={`modal-dialog modal-dialog-centered ${props.modalSize || ""}`} role="document">
                <div className="modal-content bg-dark text-white">
                    <div className="modal-header custom-border-dark">
                        <h3 className="modal-title" id="modal-title">{props.title}</h3>
                        <ModalCloseButton />
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    <div className="modal-footer custom-border-dark">
                        <button type="button" 
                            className={`btn btn-lg btn-${props.closeButtonColor || Color.Secondary}`} 
                            data-dismiss="modal">
                            <FontAwesomeIcon icon={faTimes} /> {props.closeButtonText || "Stäng"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}