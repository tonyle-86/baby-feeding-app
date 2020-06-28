import React from 'react';
// import './Radio.scss';
import Aux from '../../../hoc/Aux/Aux';

const input = (props) => {
    return (
        <Aux>
            <label htmlFor={props.id}>{props.label}</label>
            <input value={props.id} defaultValue={props.defaultValue} type={props.type} className={`${props.className}`} onChange={props.change} id={props.id} name={props.name}/>
            
        </Aux>
    )
}

export default input;