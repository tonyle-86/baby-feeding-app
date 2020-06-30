import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import './Config.scss';

class Config extends Component {
    render(){

        let foodOptionsList = this.props.foodOptionsArr.map((item,idx) => {
            return <li className='food-item' key={idx}>{item.food} <i className="fa fa-trash fr" aria-hidden="true" 
            onClick={() => this.props.removeFoodOptionHandler(item.fbKey, idx)}></i></li>
        })

        // if (foodOptionsList.length === 0) {
        //     foodOptionsList = 
        // }

        return (
            <Aux>
                <h2>{this.props.label} <i className="fa fa-cogs" aria-hidden="true"> </i></h2>
                <h3>Food options</h3>
                <ul className='food-items'>
                    {foodOptionsList}
                </ul>
            </Aux>
        )
    }
}

export default Config; 