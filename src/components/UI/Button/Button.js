import React from 'react';
import './Button.scss';

const button = (props) => {
    return (
        <button onClick={props.clicked} className={`Button ${props.styleName}`}>
            {props.label}
        </button>
    )
}

export default button;