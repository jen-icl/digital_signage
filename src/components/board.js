import React, { Component, Fragment } from 'react';
import Header from './header';
import ActionButtons from './actionButtons';
import AddForm from './addForm';
import DeleteForm from './deleteForm';
import '../css/component.css';

class Board extends Component {
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

    goToBoard = selectedBoard => {
        const { location, location: { state } } = this.props;
        this.props.history.push({
            pathname: `${location.pathname}/${selectedBoard}`,
            state
        });
    }

    render() {
        const { addModalOpen, deleteModalOpen } = this.state;
        const { data, checkExist, addData, deleteData, match: {params} } = this.props;
        if (Object.keys(data).length === 0) {
            return null;
        }

        const { locationName, roomName } = params;
        const boardInfo = data['Store'][locationName][roomName];
        let boardList = [];

        if (!boardInfo) {
            boardList.push(<li key="Add a Board" onClick={this.toggleAddModal}>Add a Board</li>);
        } else {
            boardList = Object.keys(boardInfo).map(key => (
                <li key={key} onClick={() => this.goToBoard(key)}>{key}</li>
            ));
        }

        const activeDeleteBtn = !!Object.keys(boardInfo).length;

        return (
            <Fragment>
                <Header />
                <div className="board-container">
                    <ul className="board-list">
                        {boardList}
                    </ul>
                    <ActionButtons component="Board" activeDeleteBtn={activeDeleteBtn} toggleAddModal={this.toggleAddModal} toggleDeleteModal={this.toggleDeleteModal} />
                    {addModalOpen ? <AddForm addModalOpen={addModalOpen} toggleAddModal={this.toggleAddModal} title="board" checkExist={checkExist} addData={addData} route={`/Store/${params.locationName}/${params.roomName}`} /> : null}
                    {deleteModalOpen ? <DeleteForm deleteModalOpen={deleteModalOpen} toggleDeleteModal={this.toggleDeleteModal} title="board" data={data} checkExist={checkExist} addData={addData} deleteData={deleteData} route={`/Store/${params.locationName}/${params.roomName}`} /> : null}
                </div>
            </Fragment>
        );
    }
}

export default Board;
