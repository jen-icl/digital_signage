import React, { Component } from 'react';
import AddForm from './addForm';
import '../css/location.css';

class Location extends Component {
    state = {
        selectedLocation: '',
        addModalOpen: false
    }

    toggleAddModal = () => {
        this.setState({
            addModalOpen: !this.state.addModalOpen
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
        const { addModalOpen } = this.state;
        const { data, checkExist, addData } = this.props;
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
                    <button className="btn" type="submit">Visit Location →</button>
                </form>
                <button className="btn" onClick={this.toggleAddModal}>Add Location</button>
                {addModalOpen ? <AddForm addModalOpen={addModalOpen} title="Location" toggleAddModal={this.toggleAddModal} checkExist={checkExist} addData={addData} path="/" /> : null}
            </div>
        );
    }
}

export default Location;
