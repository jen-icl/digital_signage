import React from 'react';

const ListItem = props => {
    const { title, image } = props;
    return (
        <tr className="listItem">
            <td>
                <img src={image} alt={title} />
            </td>
            <td>
                <h6>{title}</h6>
            </td>
        </tr>
    );
}

export default ListItem;
