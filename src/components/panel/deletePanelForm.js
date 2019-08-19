import React, { Component } from 'react';
import Modal from '../../general/modal';

class DeletePanelForm extends Component {
    state = {
        selectPanel: ''
    };

    handleSubmit = event => {
        event.preventDefault();
        const { selectPanel } = this.state;
        const { data, checkExist, addData, deleteData, toggleDeleteModal, locationName, roomName, boardName } = this.props;
        const path = `/Store/${locationName}/${roomName}/${boardName}/panel/`;
        const panelData = data['Store'][locationName][roomName][boardName].panel;

        if (selectPanel.match('Activity')) {
            //deleting activity panel
            const activityData = [...panelData['Activity']];
            const deleteActivityPath = `${path}/Activity`;
            if (activityData.length === 1) {
                if (Object.keys(panelData).length === 1) {
                    //single activity panel in the entire board, overwrites panelData = 0, prevents cascading deletions, path: Store|location|room|board|panel = 0
                    addData(path);
                } else {
                    //single activity panel in combination with other panel types, delete the activity panel, path: Store|location|room|board|panel|Activity
                    checkExist(deleteData, deleteActivityPath);
                }
            } else {
                //multiple activity panels, splice out selected Activity Panel, overwrites Activity Panel Data with truncated Activity Array List
                const activityIndex = parseInt(selectPanel.split('/')[1]);
                activityData.splice(activityIndex, 1);
                addData(deleteActivityPath, activityData);
            }
        } else {
            //deleting welcome and list panels
            if (Object.keys(panelData).length === 1) {
                //single panel in the entire board, overwrites panelData = 0, prevents cascading deletions, path: Store|location|room|board|panel = 0
                addData(path);
            } else {
                //delete the panel, path: Store|location|room|board|panel|:selectPanel
                const deletePanelPath = `${path}/${selectPanel}`;
                checkExist(deleteData, deletePanelPath)
            }
        }
        toggleDeleteModal();
    }

    handleChange = event => {
        const { name, value } = event.currentTarget
        this.setState({ [name]: value });
    }

    render() {
        const { selectPanel } = this.state;
        const { data, locationName, roomName, boardName, deleteModalOpen, toggleDeleteModal, title } = this.props;

        if (Object.keys(data).length === 0) {
            return null;
        }


        const panelData = data['Store'][locationName][roomName][boardName].panel
        const list = Object.keys(panelData).map(panelKey => {
            if(panelKey !== 'Activity') {
                return <option key={panelKey} value={panelKey}>{panelKey}</option>;
            } else {
                const activityPanel = panelData['Activity'];
                const activity = Object.values(activityPanel).map((activityValue, activityIndex) => (
                    <option key={activityValue} value={`Activity/${activityIndex}`}>{activityValue}</option>
                ));
                return activity;
            }
        });

        return (
            <Modal open={deleteModalOpen}>
                <span onClick={toggleDeleteModal} className="close-popup">x</span>
                <h2>{`Delete ${title}`}</h2>
                <form onSubmit={this.handleSubmit}>
                    <select name="selectPanel" onChange={this.handleChange} defaultValue="default">
                        <option disabled value="default">--</option>
                        {list}
                    </select>
                    {selectPanel ? <button type="submit">Delete</button> : <button disabled type="submit">Delete</button>}
                </form>
            </Modal>
        );
    }
}

/*Tasks:
vDisable Delete Button on index.js if no panels found
vIf Panels found:
vGet Panel Details
vPre-fill Select Tag
vDisable submit button if nothing selected
vonSubmit
    (Welcome) or any Random Title and List
        1. Check if there's only one panel
        2. If one panel >>> addData location|room|board|panel: 0
        3. If more than one panel >>> deleteData location|room|board|panel|(Welcome) or any Random Title / List
    Activity
        1. Check Activity Array.length if there's only one Activity panel
        2. If one Activity panel >>> check if panel only has one panel >>> addData location|room|board|panel: 0
        3. If panel has more than one panel >>> deleteData location|room|board|panel|Activity
        4. If more than one Activity panel >>> remove Activity panel from array >>> addData location|room|board|panel|Activity
*/

/*Props:
deleteModalOpen={deleteModalOpen}
toggleDeleteModal={this.toggleDeleteModal}
title="panel"
data={data}
checkExist={checkExist}
addData={addData}
deleteData={deleteData}
locationName={params.locationName}
roomName={params.roomName}
boardName={params.boardName}
*/

export default DeletePanelForm;
