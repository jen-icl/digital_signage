import React, {Component} from 'react';

class Room extends Component {
    render() {
        const locationInfo = this.props.data[this.props.match.params.location];
        if(locationInfo) {
            const roomList = Object.keys(locationInfo).map(key => (
                <button key={key} onClick={() => this.props.history.push(`${this.props.location.pathname}/${key}`)}>{key}</button>
            ));
            return <div>{roomList}</div>
        }
        return null;
    }
}

export default Room;
