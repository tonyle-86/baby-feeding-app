import React from 'react';
import './Backdrop.scss';

const backdrop = (props) => {

    return (

        <div className='backdrop' onClick={props.clicked}>{props.children}</div>

    )
};

export default backdrop;
