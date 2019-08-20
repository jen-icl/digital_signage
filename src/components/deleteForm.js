import React, { Component } from 'react';
import Modal from '../general/modal';

class DeleteForm extends Component {
    state = {
        selection: ''
    };

    handleSubmit = event => {
        event.preventDefault();
        const { selection } = this.state;
        const { data, title, checkExist, addData, deleteData, route, toggleDeleteModal } = this.props;
        const path = `${route}/${selection}`;

        const pathArray = route.split('/').filter(Boolean);
        let dataPath = data;
        pathArray.forEach(key => dataPath = dataPath[key]);

        if (Object.keys(dataPath).length === 1) {
            addData(route)
        } else {
            checkExist(deleteData, path);
        }

        if (title === 'location') {
            const activityPath = data['Activity'];
            if (Object.keys(activityPath).length === 1) {
                addData(activityPath)
            } else {
                checkExist(deleteData, `/Activity/${selection}`);
            }
        }

        toggleDeleteModal();
    }

    handleChange = event => {
        const { name, value } = event.currentTarget
        this.setState({ [name]: value });
    }

    render() {
        const { selection } = this.state;
        const { deleteModalOpen, title, data, route, toggleDeleteModal } = this.props;

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
                    <h2>{`Delete ${title}`}</h2>
                    <select name="selection" onChange={this.handleChange} defaultValue="default">
                        <option disabled value="default">--</option>
                        {list}
                    </select>
                    {selection ? <button type="submit">Delete</button> : <button disabled type="submit">Delete</button>}
                </form>
            </Modal >
        );
    }
}

export default DeleteForm;
