import React from 'react';

const WelcomePanel = props => {
    const { title, desc, image } = props;
    return (
        <div className="view-panel welcome-panel">
            <div className="background" style={{backgroundImage: `url(${image})`}}></div>
            <h2>{title}</h2>
            <p>{desc}</p>
        </div>
    );
}

export default WelcomePanel;
