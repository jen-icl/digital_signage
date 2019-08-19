import React, { Component } from 'react';
import Modal from '../../general/modal';

class DeletePanelForm extends Component {
    render() {
        const { deleteModalOpen, toggleDeleteModal, title } = this.props;
        return (
            <Modal open={deleteModalOpen}>
                <span onClick={toggleDeleteModal} className="close-popup">x</span>
                <h2>{`Delete ${title}`}</h2>
            </Modal>
        );
    }
}
/*Props:
deleteModalOpen={deleteModalOpen}
toggleDeleteModal={this.toggleDeleteModal}
title="panel"
data={data}
checkExist={checkExist}
deleteData={deleteData}
locationName={params.locationName}
roomName={params.roomName}
boardName={params.boardName}
*/
export default DeletePanelForm;
