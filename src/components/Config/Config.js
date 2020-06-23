import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Aux from '../../hoc/Aux/Aux';

class Config extends Component {
    render(){

        const foodOptionsList = this.props.foodOptionsArr.map((item,idx) => {
            return <li key={idx}>{item}</li>
        })

        return (
            <Aux>
                <h3>Food options</h3>
                <ul>{foodOptionsList}</ul>
                <Input change={this.props.addFoodOptionHandler} placeholder='Add food item'/>
                <Button label='Add food item' clicked={this.props.postFoodOptionHandler}/>
                
            </Aux>
        )
    }
}

export default Config; 