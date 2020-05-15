import React, { Component } from 'react';
import './Dropdown.scss';
import Aux from '../../../hoc/Aux/Aux';
import DropdownOption from './DropdownOption';

class Dropdown extends Component {

    render() {

        let optionsArr = [];

        for (let i = 10; i <= 300; i += 5) {
            optionsArr.push(i);
        }

        const optionsItems = optionsArr.map((i) => {
            return (
                <DropdownOption key={i} label={i} />
            )
        })

        return(
            <Aux>
                <label className="label">{this.props.label}:</label>
                <select className="Dropdown" value={this.props.value} onChange={this.props.change} >
                    {optionsItems}   
                </select>
            </Aux>
        )
    }
} 


export default Dropdown;