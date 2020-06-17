import React from 'react';
import './Button.scss';

const button = (props) => {
    return (
        <button onClick={props.clicked} disabled={props.disabled} className={`Button ${props.styleName}`}>
            <i className={props.icon} aria-hidden="true"></i><span>{props.label}</span>
        </button>
    )
}

export default button;