import React, { Component } from 'react';
import AddForm from './addForm';

class Board extends Component {
    state = {
        addModalOpen: false
    }

    toggleAddModal = () => {
        this.setState({
            addModalOpen: !this.state.addModalOpen
        });
    }

    goToBoard = selectedBoard => {
        const { location, location: { state } } = this.props;
        this.props.history.push({
            pathname: `${location.pathname}/${selectedBoard}`,
            state
        });
    }

    renderBoard = () => {
        const { locationName, roomName } = this.props.match.params;
        const boardInfo = this.props.data[locationName][roomName];

        if (!boardInfo) {
            return null;
        }

        const boardList = Object.keys(boardInfo).map(key => (
            <button key={key} onClick={() => this.goToBoard(key)}>{key}</button>
        ));

        return boardList;
    }

    render() {
        const { addModalOpen } = this.state;
        const { data, checkExist, addData, match: {params} } = this.props;
        if (Object.keys(data).length === 0) {
            return null;
        }

        return (
            <div>
                {this.renderBoard()}
                <button onClick={this.toggleAddModal}>Add Board</button>
                {addModalOpen ? <AddForm addModalOpen={addModalOpen} toggleAddModal={this.toggleAddModal} title="Board" checkExist={checkExist} addData={addData} route={`/${params.locationName}/${params.roomName}`} /> : null}
            </div>
        );
    }
}

export default Board;
