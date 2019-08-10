import React from 'react';

const ActivityPanel = props => {
    const { title, desc, image, video } = props;
    return (
        <div className="activity-panel">
            <div className="background" style={`background-image: url(${image})`}></div>
            <h2>{title}</h2>
            <p>{desc}</p>
            <iframe src={video} height="500" width="500"></iframe>
        </div>
    );
}

export default ActivityPanel;
