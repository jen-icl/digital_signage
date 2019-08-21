import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AddTextForm from './addTextForm';
import AddListForm from './addListForm';
import AddActivityForm from './addActivityForm';
import DeletePanelForm from './deletePanelForm';

class Panel extends Component {
    state = {
        addTextOpen: false,
        addListOpen: false,
        addActivityOpen: false,
        deleteModalOpen: false
    }

    toggleAddModal = type => {
        const stateType = `add${type}Open`;
        this.setState({
            [stateType]: !this.state[stateType]
        });
    }

    toggleDeleteModal = () => {
        this.setState({
            deleteModalOpen: !this.state.deleteModalOpen
        });
    }

    goToPanel = selectedPanel => {
        // const { location, location: { state } } = this.props;
        // this.props.history.push({
        //     pathname: `${location.pathname}/${selectedPanel}`,
        //     state
        // });
    }

    // goToView = () => {
    //     const { location, location: { state } } = this.props;
    //     this.props.history.push({
    //         pathname: `/view${location.pathname}`,
    //         state
    //     });
    // }

    renderPanel = () => {
        const { locationName, roomName, boardName } = this.props.match.params;
        const panelInfo = this.props.data['Store'][locationName][roomName][boardName].panel;

        if (!panelInfo) {
            return <li>Add a Panel</li>;
        }

        const panelList = Object.keys(panelInfo).map(key => {
            switch (key) {
                case 'Activity':
                    const revealActivity = panelInfo['Activity'].map(activity => {
                        return <li key={activity} onClick={() => this.goToPanel(activity)}>{activity}</li>;
                    });
                    return revealActivity;
                default:
                    return <li key={key} onClick={() => this.goToPanel(key)}>{key}</li>;
            }
        });

        panelList.unshift(
            <li key="preview" className="preview">
                <Link to={`/view/${locationName}/${roomName}/${boardName}`} target="_blank">Preview Entire Board</Link>
            </li>
        );

        return panelList;
    }

    render() {
        const { addTextOpen, addListOpen, addActivityOpen, deleteModalOpen } = this.state;
        const { data, checkExist, addData, deleteData, match: { params } } = this.props;
        if (Object.keys(data).length === 0) {
            return null;
        }

        //const transitionStatus = data['Store'][params.locationName][params.roomName][params.boardName].transition;
        const activityAvailable = data['Activity'][params.locationName]
        const panelAvailable = data['Store'][params.locationName][params.roomName][params.boardName].panel

        return (
            <Fragment>
                <div className="panel-container">
                    {/* <p className="transitionStatus">
                        {`Transition: ${transitionStatus ? 'On' : 'Off'}`}
                    </p> */}
                    <ul className="panel-list">
                        {this.renderPanel()}
                    </ul>
                    <div className="action-buttons">
                        <button onClick={() => this.toggleAddModal('Text')}>Add Text Panel</button>
                        { activityAvailable ? <button onClick={() => this.toggleAddModal('List')}>Add List Panel</button> : <button disabled>Add List Panel</button> }
                        <button onClick={() => this.toggleAddModal('Activity')}>Add Activity Panel</button>
                        { panelAvailable ? <button onClick={this.toggleDeleteModal}>Delete Panel</button> : <button disabled>Delete Panel</button> }

                    </div>
                    {addTextOpen ? <AddTextForm addModalOpen={addTextOpen} toggleAddModal={this.toggleAddModal} type="text" checkExist={checkExist} addData={addData} locationName={params.locationName} roomName={params.roomName} boardName={params.boardName} /> : null}
                    {addListOpen ? <AddListForm addModalOpen={addListOpen} toggleAddModal={this.toggleAddModal} type="list" data={data} checkExist={checkExist} addData={addData} locationName={params.locationName} roomName={params.roomName} boardName={params.boardName} /> : null}
                    {addActivityOpen ? <AddActivityForm addModalOpen={addActivityOpen} toggleAddModal={this.toggleAddModal} type="activity" data={data} checkExist={checkExist} addData={addData} locationName={params.locationName} roomName={params.roomName} boardName={params.boardName} /> : null}
                    {deleteModalOpen ? <DeletePanelForm deleteModalOpen={deleteModalOpen} toggleDeleteModal={this.toggleDeleteModal} title="panel" data={data} checkExist={checkExist} addData={addData} deleteData={deleteData} locationName={params.locationName} roomName={params.roomName} boardName={params.boardName} /> : null}
                </div>
            </Fragment>
        );
    }
}

export default Panel;
