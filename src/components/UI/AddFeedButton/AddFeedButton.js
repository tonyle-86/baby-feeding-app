import React from 'react';
import './AddFeedButton.scss';

const addFeedButton = (props) => {
    return (
        <button className="AddFeedButton">{props.label}</button>
    )
}

export default addFeedButton;