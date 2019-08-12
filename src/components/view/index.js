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
        const { locationName, roomName, boardName } = this.props.match.params;
        const panelInfo = this.props.data[locationName][roomName][boardName];

        let panelList = [];
        for (let i = 0; i < Object.keys(panelInfo).length; i++) {
            const content = Object.values(panelInfo)[i];
            console.log('content', content)
            let filteredContent = [];
            switch (content.type) {
                // case 'welcome':
                //     panelList.push(<WelcomePanel key={content.title} panelInfo={content} />);
                //     break;
                // case 'list':
                //     filteredContent = Object.values(content).filter(value => typeof value === 'object');
                //     panelList.push(<ListPanel key={content.title} panelInfo={filteredContent} />);
                //     break;
                case 'activity':
                    panelList.push(<ActivityPanel key={content.title} panelInfo={content} />);
                    break;
                default:
                    break;
            }
        }

        this.totalFrames = panelList.length;

        return panelList;
    }

    render() {
        const { data } = this.props;
        const {slideFrame} = this.state;
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
