import React from 'react';
import ListItem from './listItem';

const ListPanel = props => {
    const {panelInfo} = props;
    const listArray = Object.values(panelInfo).map(({title, image}) => {
        return <ListItem key={title} title={title} image={image} />;
    });

    return (
        <div className="view-panel list-panel">
            <div className="children">
                <h2>Activity List</h2>
                <table>
                    <tbody>
                        {listArray}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListPanel;