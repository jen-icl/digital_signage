import React, { Component } from 'react';
import Modal from '../../general/modal';

class AddTextForm extends Component {
    state = {
        content: {
            type: 'text',
            title: '',
            desc: '',
            image: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const { content} = this.state;
        const { checkExist, addData, toggleAddModal, locationName, roomName, boardName } = this.props;
        const path = `/Store/${locationName}/${roomName}/${boardName}/panel/${content.title}`;
        checkExist(addData, path, content);
        toggleAddModal('Text');
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
        const { content: { title, desc, image } } = this.state;
        const { addModalOpen, type, toggleAddModal } = this.props;

        return (
            <Modal open={addModalOpen} >
                <span onClick={() => toggleAddModal('Text')} className="close-popup">x</span>
                <form onSubmit={this.handleSubmit}>
                    <h2>{`Add ${type} Panel`}</h2>
                    <input id="title" name="title" type="text" placeholder={`Enter ${type} panel title`} onChange={this.handleChange} />
                    <input id="image" name="image" type="text" placeholder={`Enter ${type} panel background image url`} onChange={this.handleChange} />
                    <textarea id="desc" name="desc" placeholder={`Enter ${type} panel description`} onChange={this.handleChange}></textarea>
                    { title && desc && image ? <button type="submit">Create</button> : <button disabled type="submit">Create</button> }
                </form>
            </Modal >
        );
    }
}

export default AddTextForm;
