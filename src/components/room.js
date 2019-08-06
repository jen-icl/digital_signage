import React, { Component } from 'react';
import AddForm from './addForm';

class Room extends Component {
    state = {
        addModalOpen: false
    }

    toggleAddModal = () => {
        this.setState({
            addModalOpen: !this.state.addModalOpen
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
        const { addModalOpen } = this.state;
        const { data, checkExist, addData, match: {params} } = this.props;
        if (Object.keys(data).length === 0) {
            return null;
        }

        return (
            <div>
                {this.renderRoom()}
                <button onClick={this.toggleAddModal}>Add Room</button>
                {addModalOpen ? <AddForm addModalOpen={addModalOpen} toggleAddModal={this.toggleAddModal} title="Room" checkExist={checkExist} addData={addData} route={`/${params.locationName}`} /> : null}
            </div>
        );
    }
}

export default Room;
