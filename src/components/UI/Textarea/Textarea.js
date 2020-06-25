import React from 'react';
import './Textarea.scss';
import Aux from '../../../hoc/Aux/Aux';

const textArea = (props) => {
    return (
        <Aux>
            <label>{props.label}:</label>
            <textarea onChange={props.changeHandler} className="Textarea" value={props.value}></textarea>
        </Aux>
    )
}

export default textArea;