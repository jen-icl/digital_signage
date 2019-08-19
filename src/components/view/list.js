import React from 'react';
import ListItem from './listItem';

const ListPanel = props => {
    const {panelInfo} = props;
    const listArray = Object.values(panelInfo).map(({title, image}) => {
        return <ListItem key={title} title={title} image={image} />;
    });

    return (
        <div className="view-panel list-panel">
            <div className="background" style={{ backgroundImage: 'url(https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)' }}></div>
            <div className="panel-content">
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
