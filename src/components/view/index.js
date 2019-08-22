import React, { Component } from 'react';
import TextPanel from './text';
import ListPanel from './list';
import ActivityPanel from './activity';
import '../../css/view.css';

class View extends Component {
    constructor(props) {
        super(props);
        this.totalFrames = 0;
        this.interval = null;
        this.state = {
            slideFrame: {
                left: '0'
            },
            currentFrame: -1,
            frameDuration: 10000
        }
    }

    componentDidMount() {
        this.slide();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.frameDuration !== prevState.frameDuration) {
            console.log('didUpdate View', this.state.frameDuration)
            this.slide();
        }
    }

    slide = () => {
        const { frameDuration } = this.state;

        this.interval = setInterval(() => {
            let { currentFrame } = this.state;
            if (currentFrame === this.totalFrames - 1) {
                this.setState({
                    slideFrame: { left: 0 },
                    currentFrame: 0,
                    frameDuration: 10000
                });
            } else {
                currentFrame = currentFrame + 1;
                this.setState({
                    slideFrame: { left: `-${currentFrame}00vw` },
                    currentFrame,
                    frameDuration: 10000
                });
            }
        }, frameDuration)
    }

    extendSlideInterval = extendedTime => {
        const frameDuration = 12000 + ( extendedTime * 1000 );
        clearInterval(this.interval);
        this.setState({frameDuration});
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

            if (panelData.type === 'text') {
                //Text Panel
                panelList.unshift(<TextPanel key={panelData.title} panelInfo={panelData} />);
            } else if (key === 'List') {
                //List Panel
                panelList.unshift(<ListPanel key="list" panelInfo={panelData} />);
            } else if (key === 'Activity') {
                //Activity Panel
                panelData.forEach(activityName => (
                    panelList.push(<ActivityPanel key={activityName} panelInfo={activityInfo[activityName]} extendSlideInterval={this.extendSlideInterval} />)
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
