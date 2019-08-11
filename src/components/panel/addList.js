import React, { Component } from 'react';
import Modal from '../general/modal';

class AddList extends Component {
    state = {
        content: {
            title: '',
            image: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const { content } = this.state;
        const { addPanel, route, toggleAddModal } = this.props;
        const path = `${route}/List`;
        addPanel(content, path);
        toggleAddModal();
    }

    handleChange = event => {
        const { content } = this.state;
        const { name, value } = event.currentTarget
        this.setState({
            content: {
                ...content,
                [name]: value
            }
        });
    }

    render() {
        const { addModalOpen, panelType, toggleAddModal } = this.props;

        return (
            <Modal open={addModalOpen} >
                <span onClick={toggleAddModal} className="close-popup">x</span>
                <form onSubmit={this.handleSubmit}>
                    <h2>{`Add ${panelType}`}</h2>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" type="text" label="title" onChange={this.handleChange} />
                    <label htmlFor="image">Image URL</label>
                    <input id="image" name="image" type="text" label="image" onChange={this.handleChange} />
                    <button type="submit">Create</button>
                </form>
            </Modal >
        );
    }
}

export default AddList;
