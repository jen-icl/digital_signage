import React, { Component } from 'react';
import Modal from '../general/modal';

class DeleteForm extends Component {
    state = {
        selection: ''
    }

    handleSubmit = event => {
        event.preventDefault();
        const { selection } = this.state;
        const { checkExist, deleteData, route, toggleDeleteModal } = this.props;
        const path = `${route}/${selection}`;
        checkExist(deleteData, path);
        toggleDeleteModal();
    }

    handleChange = event => {
        const { name, value } = event.currentTarget
        this.setState({ [name]: value });
    }

    render() {
        const { deleteModalOpen, title, data, route, toggleDeleteModal } = this.props;

        const path = route.split('/').filter(Boolean);
        let dataPath = data;
        path.forEach(key => dataPath = dataPath[key]);
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
                    <button type="submit">Delete</button>
                </form>
            </Modal >
        );
    }
}

export default DeleteForm;
