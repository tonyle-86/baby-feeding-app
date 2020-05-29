import React from 'react';
import './AddFeedButton.scss';
import { Link } from 'react-router-dom';

const addFeedButton = (props) => {
    return (
        <Link to='/add-feed' className="AddFeedButton">{props.label}</Link>
    )
}

export default addFeedButton;