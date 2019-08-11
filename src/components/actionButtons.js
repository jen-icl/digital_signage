import React from 'react';
import '../css/actionButtons.css';

const ActionButtons = props => {
    const {component, toggleAddModal, toggleDeleteModal} = props;
    return (
        <div className="action-buttons">
            <button onClick={toggleAddModal}>{`Add ${component}`}</button>
            <button onClick={toggleDeleteModal}>{`Delete ${component}`}</button>
        </div>
    );
}

export default ActionButtons;
