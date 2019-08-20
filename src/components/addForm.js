import React, { Component } from 'react';
import Modal from '../general/modal';

class AddForm extends Component {
    state = {
        name: '',
        transition: true,
        checked: true
    }

    handleSubmit = event => {
        event.preventDefault();
        const {name, transition} = this.state;
        const { title, checkExist, addData, route, toggleAddModal } = this.props;
        const path = `${route}/${name}`;

        if (title === 'location'){
            checkExist(addData, `/Activity/${name}`)
        }

        if (title === 'board') {
            checkExist(addData, path, {transition, panel: 0});
        } else {
            checkExist(addData, path);
        }
        toggleAddModal();
    }

    handleChange = event => {
        const {name, value} = event.currentTarget
        this.setState({ [name]: value });
    }

    handleCheckbox = () => {
        this.setState({
            transition: !this.state.transition,
            checked: !this.state.checked
        });
    }

    render() {
        const { checked } = this.state;
        const { addModalOpen, title, toggleAddModal } = this.props;

        return (
            <Modal open={addModalOpen} >
                <span onClick={toggleAddModal} className="close-popup">x</span>
                <form onSubmit={this.handleSubmit}>
                    <h2>{`Add ${title}`}</h2>
                    <input id="name" name="name" type="text" placeholder={`Enter a new ${title} name`} onChange={this.handleChange} />
                    {title === 'board' ?
                        <div>
                            <input type="checkbox" id="transition" name="transition" checked={checked} onChange={this.handleCheckbox} />
                            <label htmlFor="transition">Transition?</label>
                        </div>
                        : null
                    }
                    <button type="submit">Add</button>
                </form>
            </Modal >
        );
    }
}

export default AddForm;
