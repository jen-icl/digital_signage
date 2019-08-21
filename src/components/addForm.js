import React, { Component } from 'react';
import Modal from '../general/modal';

class AddForm extends Component {
    state = {
        componentTitle: '',
        transition: true,
        checked: true
    }

    handleSubmit = event => {
        event.preventDefault();
        const { componentTitle, transition } = this.state;
        const { component, checkExist, addData, route, toggleAddModal } = this.props;

        if (componentTitle) {
            const path = `${route}/${componentTitle}`;

            if (component === 'location') {
                checkExist(addData, `/Activity/${componentTitle}`)
            }

            if (component === 'board') {
                checkExist(addData, path, { transition, panel: 0 });
            } else {
                checkExist(addData, path);
            }

            toggleAddModal();
        }
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
        const { componentTitle, checked } = this.state;
        const { addModalOpen, component, toggleAddModal } = this.props;

        return (
            <Modal open={addModalOpen} >
                <span onClick={toggleAddModal} className="close-popup">x</span>
                <h2>{`Add ${component}`}</h2>
                <form onSubmit={this.handleSubmit}>
                    <input id="componentTitle" name="componentTitle" type="text" placeholder={`Enter a new ${component} title`} onChange={this.handleChange} />
                    { component === 'board' ?
                        <div>
                            <input type="checkbox" id="transition" name="transition" checked={checked} onChange={this.handleCheckbox} />
                            <label htmlFor="transition">Transition?</label>
                        </div> :
                        null
                    }
                    { componentTitle ? <button type="submit">Add</button> : <button disabled type="submit">Add</button> }
                </form>
            </Modal >
        );
    }
}

export default AddForm;
