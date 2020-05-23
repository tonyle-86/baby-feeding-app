import React from 'react';
import './Input.scss';
import Aux from '../../../hoc/Aux/Aux';

const input = (props) => {
    return (
        <Aux>
            {props.label ? <label>{props.label}:</label> : null}
            <input value={props.value} type="text" className={`${props.className} Input`} onChange={props.change}/>
        </Aux>
    )
}

export default input;