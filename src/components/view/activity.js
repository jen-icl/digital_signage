import React from 'react';

const ActivityPanel = props => {
    const { title, desc, image, video } = props.panelInfo;
    return (
        <div className="view-panel activity-panel">
            <div className="background" style={{ backgroundImage: `url(${image})` }}></div>
            <div className="view-content">
                <h2>{title}</h2>
                <p>{desc}</p>
                <iframe src={video} title={title} height="315" width="560"></iframe>
            </div>
        </div>
    );
}

export default ActivityPanel;
