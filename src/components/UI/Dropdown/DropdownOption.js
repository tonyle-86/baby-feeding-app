import React from 'react';
import './Dropdown.scss';

const dropdownOption = (props) => {
    return(
        <option value={props.label}>{props.label}ml</option>
        
    )
}

export default dropdownOption;