import React from 'react';

const WelcomePanel = props => {
    const {title, content, background_img} = props;
    return (
        <div>
            <div class="welcome_panel_background" style={`background-image: url(${background_img})`}></div>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}

export default WelcomePanel;
