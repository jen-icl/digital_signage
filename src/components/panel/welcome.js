import React from 'react';

const WelcomePanel = props => {
    const { title, desc, image } = props;
    return (
        <div className="welcome-panel">
            <div className="background" style={`background-image: url(${image})`}></div>
            <h2>{title}</h2>
            <p>{desc}</p>
        </div>
    );
}

export default WelcomePanel;
