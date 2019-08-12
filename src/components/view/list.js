import React from 'react';
import ListItem from './listItem';

const ListPanel = props => {
    const {panelInfo} = props;
    console.log('listpanel', props.panelInfo);
    const listArray = Object.keys(panelInfo).map(key => (
        <ListItem index={key} title={key.title} image={key.image} />
    ));

    return (
        {listArray}
    );
}

export default ListPanel;
