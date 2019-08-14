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
        const { data, locationName, addModalOpen, title, toggleAddModal } = this.props;

        if (Object.keys(data).length === 0) {
            return null;
        }

        const activityList = Object.keys(data['Activity'][locationName]).map(key => (
            <li key={key}>{key}</li>
        ));

        return (
            <Modal open={addModalOpen} >
                <span onClick={() => toggleAddModal('List')} className="close-popup">x</span>
                <form onSubmit={this.handleSubmit}>
                    <h2>{`Create ${title} Panel from Location Activities`}</h2>
                    <ul className="activity-list">
                        {activityList}
                    </ul>
                    <button type="submit">Create</button>
                </form>
            </Modal >
        );
    }
}

export default AddListForm;
