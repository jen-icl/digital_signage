import React, { Component } from 'react';
import Modal from '../../general/modal';

class AddListForm extends Component {
    handleSubmit = event => {
        event.preventDefault();
        const { data, locationName, roomName, boardName, addData, toggleAddModal } = this.props;

        const activityData = data['Activity'][locationName];
        const list = Object.values(activityData).map(value => (
                { title: value.title, image: value.image }
            ));
        const content = list;

        const panelPath = `/Store/${locationName}/${roomName}/${boardName}/panel/${`List`}`;
        addData(panelPath, content);
        toggleAddModal('List');
    }

    render() {
        const { data, locationName, addModalOpen, type, toggleAddModal } = this.props;

        if (Object.keys(data).length === 0) {
            return null;
        }

        const activityList = Object.keys(data['Activity'][locationName]).map(key => (
            <li key={key}>{key}</li>
        ));


        return (
            <Modal open={addModalOpen} >
                <span onClick={() => toggleAddModal('List')} className="close-popup">x</span>
                <h2>{`Create ${type} Panel`}</h2>
                <form onSubmit={this.handleSubmit}>
                    <ul className="activity-list">
                        {activityList}
                    </ul>
                    <button type="submit">Create</button>
                </form>
            </Modal >
        );
    }
}

export default AddListForm;
