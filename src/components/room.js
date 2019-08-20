import React, { Component, Fragment } from 'react';
import Header from './header';
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
        const roomInfo = this.props.data['Store'][locationName];

        if (!roomInfo) {
            return <li onClick={this.toggleAddModal}>Add a Room</li>;
        }

        const roomList = Object.keys(roomInfo).map(key => (
            <li key={key} onClick={() => this.goToRoom(key)}>{key}</li>
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
            <Fragment>
                <Header />
                <div className="room-container">
                    <ul className="room-list">
                        {this.renderRoom()}
                    </ul>
                    <ActionButtons component="Room" toggleAddModal={this.toggleAddModal} toggleDeleteModal={this.toggleDeleteModal} />
                    {addModalOpen ? <AddForm addModalOpen={addModalOpen} toggleAddModal={this.toggleAddModal} title="room" checkExist={checkExist} addData={addData} route={`/Store/${params.locationName}`} /> : null}
                    {deleteModalOpen ? <DeleteForm deleteModalOpen={deleteModalOpen} toggleDeleteModal={this.toggleDeleteModal} title="room" data={data} checkExist={checkExist} addData={addData} deleteData={deleteData} route={`/Store/${params.locationName}`} /> : null}
                </div>
            </Fragment>
        );
    }
}

export default Room;
