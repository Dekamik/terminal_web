import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export const ModalCloseButton: React.FunctionComponent = () => {
    return (
        <button type="button" className="btn btn-white" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"><FontAwesomeIcon icon={faTimes} /></span>
        </button>
    );
}