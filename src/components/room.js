import React, { Component } from 'react';
import ActionButtons from './actionButtons';
import AddForm from './addForm';
import DeleteForm from './deleteForm';
import '../css/component.css';

class Room extends Component {
    state = {
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

    goToRoom = selectedRoom => {
        const { location, data } = this.props;
        this.props.history.push({
            pathname: `${location.pathname}/${selectedRoom}`,
            state: data
        });
    }

    renderRoom = () => {
        const { locationName } = this.props.match.params;
        const roomInfo = this.props.data[locationName];

        if (!roomInfo) {
            return null;
        }

        const roomList = Object.keys(roomInfo).map(key => (
            <button key={key} onClick={() => this.goToRoom(key)}>{key}</button>
        ));

        return roomList;
    }

    render() {
        const { addModalOpen, deleteModalOpen } = this.state;
        const { data, checkExist, addData, deleteData, match: {params} } = this.props;
        if (Object.keys(data).length === 0) {
            return null;
        }

        return (
            <div className="room-container">
                {this.renderRoom()}
                <ActionButtons component="Room" toggleAddModal={this.toggleAddModal} toggleDeleteModal={this.toggleDeleteModal} />
                {addModalOpen ? <AddForm addModalOpen={addModalOpen} toggleAddModal={this.toggleAddModal} title="room" checkExist={checkExist} addData={addData} route={`/${params.locationName}`} /> : null}
                {deleteModalOpen ? <DeleteForm deleteModalOpen={deleteModalOpen} toggleDeleteModal={this.toggleDeleteModal} title="room" checkExist={checkExist} deleteData={deleteData} data={data} route={`/${params.locationName}`} /> : null}
            </div>
        );
    }
}

export default Room;
