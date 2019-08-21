import React from 'react';

const ListItem = props => {
    const { title, image } = props;
    return (
        <tr className="listItem">
            <td>
                <img src={image} alt={title} />
            </td>
            <td>
                <p>{title}</p>
            </td>
        </tr>
    );
}

export default ListItem;
