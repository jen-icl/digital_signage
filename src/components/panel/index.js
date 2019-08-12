import React, { Component } from 'react';
import AddWelcomeForm from './addWelcomeForm';
import AddListForm from './addListForm';
import AddActivityForm from './addActivityForm';
import DeleteForm from '../deleteForm';
import '../../css/component.css';

class Panel extends Component {
    state = {
        addWelcomeOpen: false,
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

    renderPanel = () => {
        const { locationName, roomName, boardName } = this.props.match.params;
        const panelInfo = this.props.data[locationName][roomName][boardName];

        if (!panelInfo) {
            return <li>Add a Panel</li>;
        }

        const panelList = Object.keys(panelInfo).map(key => (
            <li key={key} onClick={() => this.goToPanel(key)}>{key}</li>
        ));

        return panelList;
    }

    render() {
        const { addWelcomeOpen, addListOpen, addActivityOpen, deleteModalOpen } = this.state;
        const { data, checkExist, addPanel, deleteData, match: { params } } = this.props;
        console.log('Panel Props', this.props)
        console.log('Panel State', this.state)
        if (Object.keys(data).length === 0) {
            return null;
        }

        return (
            <div className="panel-container">
                <ul className="panel-list">
                    {this.renderPanel()}
                </ul>
                <div className="action-buttons">
                    <button onClick={() => this.toggleAddModal('Welcome')}>Add Welcome Panel</button>
                    <button onClick={() => this.toggleAddModal('List')}>Add List Panel</button>
                    <button onClick={() => this.toggleAddModal('Activity')}>Add Activity Panel</button>
                    <button onClick={this.toggleDeleteModal}>Delete Panel</button>
                </div>
                {addWelcomeOpen ? <AddWelcomeForm addModalOpen={addWelcomeOpen} toggleAddModal={this.toggleAddModal} title="welcome" checkExist={checkExist} addPanel={addPanel} route={`/${params.locationName}/${params.roomName}/${params.boardName}`} /> : null}
                {addListOpen ? <AddListForm addModalOpen={addListOpen} toggleAddModal={this.toggleAddModal} title="list" checkExist={checkExist} addPanel={addPanel} route={`/${params.locationName}/${params.roomName}/${params.boardName}`} /> : null}
                {addActivityOpen ? <AddActivityForm addModalOpen={addActivityOpen} toggleAddModal={this.toggleAddModal} title="activity" checkExist={checkExist} addPanel={addPanel} route={`/${params.locationName}/${params.roomName}/${params.boardName}`} /> : null}
                {deleteModalOpen ? <DeleteForm deleteModalOpen={deleteModalOpen} toggleDeleteModal={this.toggleDeleteModal} title="panel" checkExist={checkExist} deleteData={deleteData} data={data} route={`/${params.locationName}/${params.roomName}/${params.boardName}`} /> : null}
            </div>
        );
    }
}

export default Panel;
