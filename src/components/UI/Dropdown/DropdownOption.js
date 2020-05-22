import React from 'react';
import './Dropdown.scss';

const dropdownOption = (props) => {
    return(
    <option value={props.label}>{props.label}{props.type === 'milk' ? 'ml' : ''}</option>
        
    )
}

export default dropdownOption;