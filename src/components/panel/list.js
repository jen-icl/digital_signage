import React from 'react';

const ListPanel = props => {
    const { title, image } = props;
    return (
        <div className="list-panel">
            <div className="background" style={`background-image: url(${image})`}></div>
            <h2>{title}</h2>
        </div>
    );
}

export default ListPanel;
