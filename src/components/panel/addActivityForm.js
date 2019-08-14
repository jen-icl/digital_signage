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
        newActivityForm: false
    }

    handleSubmit = event => {
        event.preventDefault();
        let { newActivityForm, content } = this.state;
        const { data, checkExist, addData, toggleAddModal, locationName, roomName, boardName } = this.props;

        const hasActivity = data['Store'][locationName][roomName][boardName].panel.hasOwnProperty('Activity');
        const panelPath = `/Store/${locationName}/${roomName}/${boardName}/panel/Activity`;
        if (hasActivity) {
            const activityPanelList = data['Store'][locationName][roomName][boardName].panel['Activity'];
            activityPanelList.push(content.title);
            addData(panelPath, activityPanelList);
        } else {
            //no available Activity Panel, create new Activity key with the new activity array
            checkExist(addData, panelPath, [content.title]);
        }

        if (newActivityForm) {
            //identify video id and redefine video url to embedded video url
            let { video } = content;
            video = `/${video}`;
            const videoId = video.match(/.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\/)([^#\&\?]*).*/)[1];
            content.video = `https://www.youtube.com/embed/${videoId}`;

            const activityPath = `/Activity/${locationName}/${content.title}`;
            checkExist(addData, activityPath, content);
        }

        toggleAddModal('Activity');
    }

    handleChange = event => {
        const { newActivityForm, content } = this.state;
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
                content: {
                    ...content,
                    title: value
                }
            });
        }
    }

    toggleForm = () => {
        this.setState({
            newActivityForm: !this.state.newActivityForm
        }, this.resetContent);
    }

    resetContent = () => {
        this.setState({
            content: {
                type: 'activity',
                title: '',
                desc: '',
                image: '',
                video: ''
            }
        });
    }

    render() {
        const { newActivityForm, content } = this.state;
        const { data, locationName, roomName, boardName, addModalOpen, title, toggleAddModal } = this.props;

        if (Object.keys(data).length === 0) {
            return null;
        }

        const activityData = data['Activity'][locationName];
        let activityList = [];
        if(activityData !== undefined && Object.keys(activityData).length !== 0) {
            const pathToPanel = data['Store'][locationName][roomName][boardName].panel
            const hasActivity = pathToPanel.hasOwnProperty('Activity');
            const currentActivityPanelList = hasActivity && pathToPanel['Activity'];
            activityList = Object.keys(activityData).map(key => {
                if(pathToPanel === 0) {
                    //return all available activities if panel is empty
                    return <option key={key} value={key}>{key}</option>;
                } else if (currentActivityPanelList && currentActivityPanelList.indexOf(key) === -1) {
                    //return filter for non-duplicating activities if /panel/Activity is present
                    return <option key={key} value={key}>{key}</option>;
                } else {
                    return null;
                }
            });
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
                            <textarea id="desc" name="desc" placeholder={`Enter an ${title} description`} onChange={this.handleChange}></textarea>
                            <input id="video" name="video" type="text" placeholder={`Enter an ${title} video url`} onChange={this.handleChange} />
                            <button type="submit">Create</button>
                        </form>
                    </Fragment>
                    :
                    <Fragment>
                        <h2>{`Add ${title} Panel`}</h2>
                        <button onClick={this.toggleForm}>Create New Activity</button>
                        <form onSubmit={this.handleSubmit}>
                            <select name="activity" onChange={this.handleChange} defaultValue="--">
                                <option disabled value="--">--</option>
                                {activityList}
                            </select>
                            { content.title ? <button type="submit">Create</button> : <button disabled type="submit">Create</button> }
                        </form>
                    </Fragment>
                }
            </Modal >
        );
    }
}

export default AddActivityForm;
