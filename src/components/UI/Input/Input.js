import React from 'react';
import './Input.scss';
import Aux from '../../../hoc/Aux/Aux';

const input = (props) => {
    return (
        <Aux>
            <label>{props.label}:</label>
            <input value={props.value} type="text" className={`${props.className} Input`} onChange={props.change}/>
        </Aux>
    )
}

export default input;