import React from 'react';
import './Button.scss';

const button = (props) => {
    return (
        <button onClick={props.clicked} disabled={props.disabled} className={`Button ${props.styleName}`}>
            {props.label}
        </button>
    )
}

export default button;