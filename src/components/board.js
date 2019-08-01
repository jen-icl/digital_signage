import React, { Component } from 'react';

class Board extends Component {
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
        const { data } = this.props;
        if (Object.keys(data).length === 0) {
            return null;
        }

        return (
            <div>
                {this.renderBoard()}
            </div>
        );
    }
}

export default Board;
