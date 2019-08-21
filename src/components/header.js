import React from 'react';
import { withRouter } from 'react-router-dom';
import '../css/header.css';

const Header = props => {
    const { location } = props;

    if ( location.pathname.match('/view')) {
        return null;
    }

    return (
        <div className="header">
            <h1>Digital Signage Admin</h1>
        </div>
    );
};

export default withRouter(Header);
