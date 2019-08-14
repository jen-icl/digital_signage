import React from 'react';

const WelcomePanel = props => {
    const { title, desc, image } = props.panelInfo;
    return (
        <div className="view-panel welcome-panel">
            <div className="background" style={{backgroundImage: `url(${image})`}}></div>
            <div className="view-content">
                <h2>{title}</h2>
                <p>{desc}</p>
            </div>
        </div>
    );
}

export default WelcomePanel;
