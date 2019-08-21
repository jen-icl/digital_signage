import React from 'react';
import '../css/actionButtons.css';

const ActionButtons = props => {
    const { component, activeDeleteBtn, toggleAddModal, toggleDeleteModal } = props;
    return (
        <div className="action-buttons">
            <button onClick={toggleAddModal}>{`Add ${component}`}</button>
            {activeDeleteBtn ?
                <button onClick={toggleDeleteModal}>{`Delete ${component}`}</button> :
                    <button disabled>{`Delete ${component}`}</button>
            }
        </div>
    );
}

export default ActionButtons;
