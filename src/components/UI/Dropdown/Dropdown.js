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
            optionsArr = [`Grapes \u{1F347}`,
                `Honeydew Melon \u{1F348}`,
                `Watermelon \u{1F349}`,
                `Orange \u{1F34A}`,
                `Banana \u{1F34C}`,
                `Pineapple \u{1F34D}`,
                `Mango \u{1F96D}`,
                `Apple \u{1F34E}`,
                `Pear \u{1F350}`,
                `Peach \u{1F351}`,
                `Cherry \u{1F352}`,
                `Strawberry \u{1F353}`,
                `Kiwi \u{1F95D}`,
                `Tomato \u{1F345}`,
                `Coconut \u{1F965}`,
                `Avacado \u{1F951}`,
                `Aubergine \u{1F346}`,
                `Potato \u{1F954}`,
                `Carrot \u{1F955}`,
                `Sweetcorn \u{1F33D}`,
                `Spinach \u{1F96C}`,
                `Broccoli \u{1F966}`,
                `Prawn \u{1F990}`,
                `Fish \u{1F41F}`,
                `Peanut \u{1F95C}`,
                `Chicken \u{1F357}`,
                `Beef \u{1F969}`,
                `Egg \u{1F95A}`,
                `Chao \u{1F35A}`,
                `Cheese \u{1F9c0}`,


];

            const foodOptionsArr = this.props.foodOptionsArr.map(i => {
                return i.food
            })

            optionsArr = [...optionsArr, ...foodOptionsArr].sort((a, b) => {
                if (a < b) {
                    return -1;
                }

                if (a > b) {
                    return 1;
                }
                return 0;
            })
        }

        const optionsItems = optionsArr.map((i) => {
            return (
                <DropdownOption type={this.props.type} key={`${i} ${i.food}`} label={i.food ? i.food : i} onClick={this.props.test}/>
            )
        })

        return(
            <Aux>
                {this.props.label ? <label className="label">{this.props.label}:</label> : null}
                <select className="Dropdown" value={this.props.value} onChange={this.props.changeHandler} >
                    {/* <option value="" disabled defaultValue='Select your option'>Select your option</option> */}
                    {optionsItems}   
                </select>
            </Aux>
        )
    }
} 


export default Dropdown;