import React, { Component } from 'react';
import Modal from '../../general/modal';

class AddActivityForm extends Component {
    state = {
        content: {
            type: 'activity',
            title: '',
            desc: '',
            image: '',
            video: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const { content } = this.state;
        const { addData, route, toggleAddModal } = this.props;
        const path = `${route}/${content.title}`;
        addData(path, content);
        toggleAddModal('Activity');
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
                <span onClick={() => toggleAddModal('Activity')} className="close-popup">x</span>
                <form onSubmit={this.handleSubmit}>
                    <h2>{`Add ${title} Panel`}</h2>
                    <input id="title" name="title" type="text" placeholder={`Enter an ${title} title`} onChange={this.handleChange} />
                    <input id="image" name="image" type="text" placeholder={`Enter an ${title} image url`} onChange={this.handleChange} />
                    <textarea id="desc" name="desc" placeholder={`Enter an ${title} description`}></textarea>
                    <input id="video" name="video" type="text" placeholder={`Enter an ${title} video url`} onChange={this.handleChange} />
                    <button type="submit">Create</button>
                </form>
            </Modal >
        );
    }
}

export default AddActivityForm;
