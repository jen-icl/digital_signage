import React, { Component } from 'react';
import WelcomePanel from './welcome';
import ListPanel from './list';
import ActivityPanel from './activity';
import '../../css/view.css';

class View extends Component {
    constructor(props) {
        super(props);
        this.totalFrames = 0;
        this.state = {
            slideFrame: {
                left: '0'
            },
            currentFrame: 0
        }
    }

    componentDidMount() {
        this.slide();
    }

    slide = () => {
        setInterval(() => {
            let { currentFrame } = this.state;
            if(currentFrame === this.totalFrames - 1){
                this.setState({
                    slideFrame: { left: 0 },
                    currentFrame: 0
                });
            } else {
                currentFrame = currentFrame + 1;
                this.setState({
                    slideFrame: { left: `-${currentFrame}00vw` },
                    currentFrame
                });
            }
        }, 10000);
    }

    renderViewPanel = () => {
        const { data, match: { params } } = this.props;
        const { locationName, roomName, boardName } = params;
        const panelInfo = data['Store'][locationName][roomName][boardName].panel;
        const activityInfo = data['Activity'][locationName];

        let panelList = [];
        for (let i = 0; i < Object.keys(panelInfo).length; i++) {
            const key = Object.keys(panelInfo)[i];
            const panelData = Object.values(panelInfo)[i];
            console.log('key', key)
            console.log('panelData', panelData)

            if (panelData.type === 'welcome') {
                //Welcome Panel
                panelList.push(<WelcomePanel key={panelData.title} panelInfo={panelData} />);
            } else if (key === 'Activity List') {
                //List Panel
                panelList.push(<ListPanel key="list" panelInfo={panelData} />);
            } else if (key === 'Activity') {
                //Activity Panel
                panelData.forEach(activityName => (
                    panelList.push(<ActivityPanel key={activityName} panelInfo={activityInfo[activityName]} />)
                ));
            }
        }

        this.totalFrames = panelList.length;

        return panelList;
    }

    render() {
        const { data } = this.props;
        const { slideFrame } = this.state;
        if (Object.keys(data).length === 0) {
            return null;
        }

        return (
            <div className="view-container">
                <div className="view-content transition" style={slideFrame}>
                    {this.renderViewPanel()}
                </div>
            </div>
        );
    }
}

export default View;
