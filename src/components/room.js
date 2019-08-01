import React, { Component } from 'react';

class Room extends Component {
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
        const { data } = this.props;
        if (Object.keys(data).length === 0) {
            return null;
        }

        return (
            <div>
                {this.renderRoom()}
            </div>
        );
    }
}

export default Room;
