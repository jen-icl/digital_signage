import React, { Component } from 'react';
import Modal from '../general/modal';

class DeleteForm extends Component {
    state = {
        componentTitle: ''
    };

    handleSubmit = event => {
        event.preventDefault();
        const { componentTitle } = this.state;
        const { data, component, checkExist, addData, deleteData, route, toggleDeleteModal } = this.props;
        const path = `${route}/${componentTitle}`;

        const pathArray = route.split('/').filter(Boolean);
        let dataPath = data;
        pathArray.forEach(key => dataPath = dataPath[key]);

        if (Object.keys(dataPath).length === 1) {
            addData(route)
        } else {
            checkExist(deleteData, path);
        }

        if (component === 'location') {
            const activityData = data['Activity'];
            if (Object.keys(activityData).length === 1) {
                addData(`/Activity`);
            } else {
                checkExist(deleteData, `/Activity/${componentTitle}`);
            }
        }

        toggleDeleteModal();
    }

    handleChange = event => {
        const { name, value } = event.currentTarget
        this.setState({ [name]: value });
    }

    render() {
        const { componentTitle } = this.state;
        const { deleteModalOpen, component, data, route, toggleDeleteModal } = this.props;

        const pathArray = route.split('/').filter(Boolean);
        let dataPath = data;
        pathArray.forEach(key => dataPath = dataPath[key]);
        let list = [];
        if (dataPath !== undefined) {
            list = Object.keys(dataPath).map(key => (
                <option key={key} value={key}>{key}</option>
            ));
        }

        return (
            <Modal open={deleteModalOpen} >
                <span onClick={toggleDeleteModal} className="close-popup">x</span>
                <form onSubmit={this.handleSubmit}>
                    <h2>{`Delete ${component}`}</h2>
                    <select name="componentTitle" onChange={this.handleChange} defaultValue="default">
                        <option disabled value="default">--</option>
                        {list}
                    </select>
                    { componentTitle ? <button type="submit">Delete</button> : <button disabled type="submit">Delete</button> }
                </form>
            </Modal >
        );
    }
}

export default DeleteForm;
