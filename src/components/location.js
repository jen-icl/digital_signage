import React, { Component } from 'react';

class Location extends Component {
    state = {
        selectedLocation: ''
    }

    goToLocation = event => {
        event.preventDefault();
        const locationName = this.state.selectedLocation;
        this.props.history.push(`/store/${locationName}`);
    }

    handleChange = event => {
        this.setState({selectedLocation: event.currentTarget.value});
    }

    render() {
        const {location} = this.props;
        const locationList = Object.keys(location).map(key => (
            <option key={key} value={key}>{key}</option>
        ));

        return (
            <form onSubmit={this.goToLocation}>
                <h2>Location</h2>
                <select name="location" onChange={this.handleChange} defaultValue="default">
                    <option disabled value="default">Select a Location</option>
                    {locationList}
                </select>
                <button type="submit">Visit Location →</button>
            </form>
        );
    }
}

export default Location;
