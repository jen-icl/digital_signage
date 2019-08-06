import React, { Component } from 'react';
import Modal from '../general/modal';

class AddForm extends Component {
    state = {
        name: ''
    }

    handleSubmit = event => {
        event.preventDefault();
        const {name} = this.state;
        const { checkExist, addData } = this.props;
        checkExist(name, addData);
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
                <h2>{`Add ${title}`}</h2>
                <form onSubmit={this.handleSubmit}>
                    <input id="name" name="name" type="text" label="name" onChange={this.handleChange} />
                    <button type="submit">Add</button>
                </form>
            </Modal >
        );
    }
}

export default AddForm;
