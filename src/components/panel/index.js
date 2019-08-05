import React, { Component } from 'react';

class Panel extends Component {
    goToPanel = selectedPanel => {
        const { location, location: { state } } = this.props;
        this.props.history.push({
            pathname: `${location.pathname}/${selectedPanel}`,
            state
        });
    }

    renderPanel = () => {
        const { locationName, roomName, boardName } = this.props.match.params;
        const panelInfo = this.props.data[locationName][roomName][boardName];

        if (!panelInfo) {
            return null;
        }

        const panelList = Object.keys(panelInfo).map(key => (
            <button key={key} onClick={() => this.goToPanel(key)}>{key}</button>
        ));

        return panelList;
    }

    render() {
        const { data } = this.props;
        if (Object.keys(data).length === 0) {
            return null;
        }

        return (
            <div>
                {this.renderPanel()}
            </div>
        );
    }
}

export default Panel;
