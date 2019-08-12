import React from 'react';

const ListItem = props => {
    const {index, title, image} = props;
    return (
        <div key={index} className="view-panel list-panel">
            <div className="background" style={{ backgroundImage: `url(${image})` }}></div>
            <h2>{title}</h2>
        </div>
    );
}

export default ListItem;
