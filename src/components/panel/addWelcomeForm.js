import React, { Component } from 'react';
import Modal from '../../general/modal';

class AddWelcomeForm extends Component {
    state = {
        content: {
            type: 'welcome',
            title: '',
            desc: '',
            image: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const { content} = this.state;
        const { checkExist, addData, route, toggleAddModal } = this.props;
        const path = `${route}/${content.title}`;
        checkExist(addData, path, content);
        toggleAddModal('Welcome');
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
                <span onClick={() => toggleAddModal('Welcome')} className="close-popup">x</span>
                <form onSubmit={this.handleSubmit}>
                    <h2>{`Add ${title} Panel`}</h2>
                    <input id="title" name="title" type="text" placeholder={`Enter a ${title} title`} onChange={this.handleChange} />
                    <input id="image" name="image" type="text" placeholder={`Enter a ${title} image url`} onChange={this.handleChange} />
                    <textarea id="desc" name="desc" placeholder={`Enter a ${title} description`} onChange={this.handleChange}></textarea>
                    <button type="submit">Create</button>
                </form>
            </Modal >
        );
    }
}

export default AddWelcomeForm;
