import React from 'react';
import './Radio.scss';
import Aux from '../../../hoc/Aux/Aux';

const input = (props) => {
    return (
        <Aux>
            
            <input value={props.value} defaultValue={props.defaultValue} type={props.type} className={`${props.className}`} onChange={props.change} id={props.id} name={props.name} checked={props.nappies === props.value}/>
            <label htmlFor={props.id}>{props.label}</label>
        </Aux>
    )
}

export default input;