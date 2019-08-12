import React, { Component } from 'react';
import ActionButtons from './actionButtons';
import AddForm from './addForm';
import DeleteForm from './deleteForm';
import '../css/location.css';

class Location extends Component {
    state = {
        selectedLocation: '',
        addModalOpen: false,
        deleteModalOpen: false
    }

    toggleAddModal = () => {
        this.setState({
            addModalOpen: !this.state.addModalOpen
        });
    }

    toggleDeleteModal = () => {
        this.setState({
            deleteModalOpen: !this.state.deleteModalOpen
        });
    }

    goToLocation = event => {
        event.preventDefault();
        const { selectedLocation } = this.state;
        const {data} = this.props;
        this.props.history.push({
            pathname: `/${selectedLocation}`,
            state: data
        });
    }

    handleChange = event => {
        this.setState({ selectedLocation: event.currentTarget.value });
    }

    render() {
        const { addModalOpen, deleteModalOpen } = this.state;
        const { data, checkExist, addData, deleteData } = this.props;
        const locationList = Object.keys(data).map(key => (
            <option key={key} value={key}>{key}</option>
        ));

        return (
            <div className="location-container">
                <form className="location-form" onSubmit={this.goToLocation}>
                    <h2>Pick a Location</h2>
                    <select name="location" onChange={this.handleChange} defaultValue="default">
                        <option disabled value="default">--</option>
                        {locationList}
                    </select>
                    <button type="submit">Visit Location →</button>
                </form>
                <ActionButtons component="Location" toggleAddModal={this.toggleAddModal} toggleDeleteModal={this.toggleDeleteModal} />
                {addModalOpen ? <AddForm addModalOpen={addModalOpen} title="location" toggleAddModal={this.toggleAddModal} checkExist={checkExist} addData={addData} route="/" /> : null}
                {deleteModalOpen ? <DeleteForm deleteModalOpen={deleteModalOpen} title="Location" toggleDeleteModal={this.toggleDeleteModal} checkExist={checkExist} deleteData={deleteData} data={data} route="/" /> : null}
            </div>
        );
    }
}

export default Location;
