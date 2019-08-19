import React from 'react';
import Video from './video'

const ActivityPanel = props => {
    const { title, desc, image, videoId } = props.panelInfo;
    return (
        <div className="view-panel activity-panel">
            <div className="background" style={{ backgroundImage: `url(${image})` }}></div>
            <div className="panel-content">
                <h2>{title}</h2>
                <p>{desc}</p>
                <Video videoId={videoId} extendSlideInterval={props.extendSlideInterval} />
            </div>
        </div>
    );
}

export default ActivityPanel;
