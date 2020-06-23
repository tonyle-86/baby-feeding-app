import React from 'react';
import './AddFeedButton.scss';
import { Link } from 'react-router-dom';

const addFeedButton = (props) => {
    return (
        <Link to='/add-feed' className="AddFeedButton fr">
            <i className="fa fa-baby-bottle fa-2x" aria-hidden="true"></i>
        </Link>
    )
}

export default addFeedButton;