import React, { Component, Fragment } from 'react';
import Header from './header';
import ActionButtons from './actionButtons';
import AddForm from './addForm';
import DeleteForm from './deleteForm';

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
        if (Object.keys(data).length === 0) {
            return null;
        }

        const locationData = data['Store'];
        const locationList = Object.keys(locationData).map(key => (
            <option key={key} value={key}>{key}</option>
        ));

        const activeDeleteBtn = !!locationList.length;

        return (
            <Fragment>
                <Header />
                <div className="location-container">
                    <form className="location-form" onSubmit={this.goToLocation}>
                        <h2>Pick a Location</h2>
                        <select name="location" onChange={this.handleChange} defaultValue="default">
                            <option disabled value="default">--</option>
                            {locationList}
                        </select>
                        <button type="submit">Visit Location →</button>
                    </form>
                    <ActionButtons component="Location" activeDeleteBtn={activeDeleteBtn} toggleAddModal={this.toggleAddModal} toggleDeleteModal={this.toggleDeleteModal} />
                    {addModalOpen ? <AddForm addModalOpen={addModalOpen} title="location" toggleAddModal={this.toggleAddModal} checkExist={checkExist} addData={addData} route="/Store" /> : null}
                    {deleteModalOpen ? <DeleteForm deleteModalOpen={deleteModalOpen} title="location" data={data} toggleDeleteModal={this.toggleDeleteModal} checkExist={checkExist} addData={addData} deleteData={deleteData} route="/Store" /> : null}
                </div>
            </Fragment>
        );
    }
}

export default Location;
