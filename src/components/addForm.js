import React, { Component } from 'react';
import Modal from '../general/modal';

class AddForm extends Component {
    state = {
        name: ''
    }

    handleSubmit = event => {
        event.preventDefault();
        const {name} = this.state;
        const { checkExist, addData, route, toggleAddModal } = this.props;
        const path = `${route}/${name}`;
        checkExist(addData, path);
        toggleAddModal();
    }

    handleChange = event => {
        const {name, value} = event.currentTarget
        this.setState({ [name]: value });
    }

    render() {
        const { addModalOpen, title, toggleAddModal } = this.props;

        return (
            <Modal open={addModalOpen} >
                <span onClick={toggleAddModal} className="close-popup">x</span>
                <form onSubmit={this.handleSubmit}>
                    <h2>{`Add ${title}`}</h2>
                    <input id="name" name="name" type="text" placeholder={`Enter a new ${title} name`} onChange={this.handleChange} />
                    <button type="submit">Add</button>
                </form>
            </Modal >
        );
    }
}

export default AddForm;
