import React, { Component, Fragment } from 'react';
import Modal from '../../general/modal';

class AddActivityForm extends Component {
    state = {
        content: {
            type: 'activity',
            title: '',
            desc: '',
            image: '',
            video: ''
        },
        existingActivity: [],
        newActivityForm: false
    }

    handleSubmit = event => {
        event.preventDefault();
        let { newActivityForm, content, existingActivity } = this.state;
        const { data, checkExist, addData, toggleAddModal, locationName, roomName, boardName } = this.props;

        const activityPanelList = data['Store'][locationName][roomName][boardName].panel['Activity'];
        if (activityPanelList === undefined) {
            //no available Activity Panel, create new Activity key with the new activity array
            const panelPath = `/Store/${locationName}/${roomName}/${boardName}/panel/Activity`;
            addData(panelPath, existingActivity);
        } else {
            const panelPath = `/Store/${locationName}/${roomName}/${boardName}/panel/Activity`;
            const newActivityList = activityPanelList.concat(existingActivity);
            addData(panelPath, newActivityList);
        }

        if (newActivityForm) {
            //identify video id and redefine video url to embedded video url
            let { video } = content;
            video = `/${video}`;
            const videoId = video.match(/.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\/)([^#\&\?]*).*/)[1];
            content.video = `https://www.youtube.com/embed/${videoId}`;

            const activityPath = `/Activity${locationName}/${content.title}`;
            checkExist(addData, activityPath, content);
        }

        toggleAddModal('Activity');
    }

    handleChange = event => {
        const { newActivityForm, content, existingActivity } = this.state;
        const { name, value } = event.currentTarget;

        if (newActivityForm) {
            this.setState({
                content: {
                    ...content,
                    [name]: value
                }
            });
        } else {
            this.setState({
                existingActivity: [value]
            });
        }
    }

    toggleForm = () => {
        this.setState({
            newActivityForm: !this.state.newActivityForm
        });
    }

    render() {
        const { newActivityForm } = this.state;
        const { data, locationName, addModalOpen, title, toggleAddModal } = this.props;

        const activityData = data['Activity'][locationName];
        let activityList = [];
        if(Object.keys(activityData).length !== 0) {
            activityList = Object.keys(activityData).map(key => (
                <option key={key} value={key}>{key}</option>
            ));
        }

        return (
            <Modal open={addModalOpen} >
                <span onClick={() => toggleAddModal('Activity')} className="close-popup">x</span>
                {newActivityForm ?
                    <Fragment>
                        <h2>{`Add ${title} Panel`}</h2>
                        <button onClick={this.toggleForm}>Add Existing Activity</button>
                        <form onSubmit={this.handleSubmit}>
                            <input id="title" name="title" type="text" placeholder={`Enter an ${title} title`} onChange={this.handleChange} />
                            <input id="image" name="image" type="text" placeholder={`Enter an ${title} image url`} onChange={this.handleChange} />
                            <textarea id="desc" name="desc" placeholder={`Enter an ${title} description`}></textarea>
                            <input id="video" name="video" type="text" placeholder={`Enter an ${title} video url`} onChange={this.handleChange} />
                            <button type="submit">Create</button>
                        </form>
                    </Fragment>
                    :
                    <Fragment>
                        <h2>{`Add ${title} Panel`}</h2>
                        <button onClick={this.toggleForm}>Create New Activity</button>
                        <form onSubmit={this.handleSubmit}>
                            <select name="activity" onChange={this.handleChange} defaultValue="default">
                                <option disabled value="default">--</option>
                                {activityList}
                            </select>
                            <button type="submit">Create</button>
                        </form>
                    </Fragment>
                }
            </Modal >
        );
    }
}

export default AddActivityForm;
