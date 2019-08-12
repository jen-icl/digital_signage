import React, { Component } from 'react';
import Modal from '../../general/modal';

class AddListForm extends Component {
    state = {
        content: {
            type: 'list',
            title: '',
            image: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const { content } = this.state;
        const { addData, route, toggleAddModal } = this.props;
        const path = `${route}/${`Activity List`}`;
        addData(path, content);
        toggleAddModal('List');
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
        const { addModalOpen, title, toggleAddModal } = this.props;

        return (
            <Modal open={addModalOpen} >
                <span onClick={() => toggleAddModal('List')} className="close-popup">x</span>
                <form onSubmit={this.handleSubmit}>
                    <h2>{`Add ${title} Panel`}</h2>
                    <input id="title" name="title" type="text" placeholder={`Enter a ${title} title`} onChange={this.handleChange} />
                    <input id="image" name="image" type="text" placeholder={`Enter a ${title} image url`} onChange={this.handleChange} />
                    <button type="submit">Create</button>
                </form>
            </Modal >
        );
    }
}

export default AddListForm;
