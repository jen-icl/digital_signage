import React from 'react';

const TextPanel = props => {
    const { title, desc, image } = props.panelInfo;
    return (
        <div className="view-panel text-panel">
            <div className="background" style={{backgroundImage: `url(${image})`}}></div>
            <div className="panel-content">
                <h2>{title}</h2>
                <p>{desc}</p>
            </div>
        </div>
    );
}

export default TextPanel;
