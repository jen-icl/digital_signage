import React from 'react';
import './modal.css';

const Modal = props => {
    const {open, children} = props;

    if(open) {
        return (
            <div className="popup-container">
                <div className="popup-content">
                    <div className="popup-children">
                        {children}
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default Modal;
