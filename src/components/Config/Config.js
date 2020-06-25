import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Aux from '../../hoc/Aux/Aux';
import './Config.scss';

class Config extends Component {
    render(){

        const foodOptionsList = this.props.foodOptionsArr.map((item,idx) => {
            return <li className='food-item' key={idx}>{item} <i className="fa fa-trash fr" aria-hidden="true" 
            onClick={this.props.removeFoodOptionHandler}></i></li>
        })

        return (
            <Aux>
                <h2>{this.props.label} <i className="fa fa-cogs" aria-hidden="true"> </i></h2>
                <h3>Food options</h3>
                <ul className='food-items'>
                    {foodOptionsList}
                </ul>
                <Input change={this.props.addFoodOptionHandler} placeholder='Add your own food items' value={this.props.foodOption}/>
                <Button label='Add food item' clicked={this.props.postFoodOptionHandler}/>
                
            </Aux>
        )
    }
}

export default Config; 