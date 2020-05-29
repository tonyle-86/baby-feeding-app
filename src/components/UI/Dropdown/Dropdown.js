import React, { Component } from 'react';
import './Dropdown.scss';
import Aux from '../../../hoc/Aux/Aux';
import DropdownOption from './DropdownOption';

class Dropdown extends Component {

    render() {

        let optionsArr;

        if (this.props.type === 'milk') {
            optionsArr = [];
            for (let i = 0; i <= 300; i += 5) {
                optionsArr.push(i);
            }
         } else {
            optionsArr = ['Chao', 'Rice', 'Carrots', 'Chicken'];
         }

        const optionsItems = optionsArr.map((i) => {
            return (
                <DropdownOption type={this.props.type} key={i} label={i} />
            )
        })

        return(
            <Aux>
                {this.props.label ? <label className="label">{this.props.label}:</label> : null}
                <select className="Dropdown" value={this.props.value} onChange={this.props.changeHandler} >
                    {optionsItems}   
                </select>
            </Aux>
        )
    }
} 


export default Dropdown;