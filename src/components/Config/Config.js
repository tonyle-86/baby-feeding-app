import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button';
import './Config.scss';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';

class Config extends Component {

    state = {
        modalOpen: false,
        fbKey: '',
        deleting: false,
        idx: ''
    }

    openModal = (fbKey, idx) => {
        console.log('OPEN Modal');
        this.setState({
            modalOpen: true,
            fbKey: fbKey,
            deleting: true,
            idx:idx
        })
    }

    closeModal = () => {
        console.log('close Modal');
        this.setState({
            modalOpen: false,
            fbKey: '',
            deleting: false,
            idx: ''
        })
    }

    render(){

        let foodOptionsList = this.props.foodOptionsArr.map((item,idx) => {
            return <li className='food-item' key={idx}>{item.food} <i className="fa fa-trash fa-1-5x fr" aria-hidden="true" 
            onClick={() => this.openModal(item.fbKey, idx)}></i></li>
        })

        let modal;

        if (this.state.modalOpen) {
            modal = <Backdrop>
                <Modal message='Are you sure you want to delete?' fbKey={this.state.fbKey} closeModal={this.closeModal.bind(this)} removeHandler={() => {this.props.removeFoodOptionHandler(this.state.fbKey, this.state.idx);this.closeModal()}} label='Confirm' cancelLabel='Cancel' />
            </Backdrop>
        }

        return (
            <Aux>
                <h2>{this.props.label}</h2>
                <h3>Food options</h3>
                <ul className='food-items'>
                    {foodOptionsList}
                </ul>
                {modal}
                <Input change={this.props.foodOptionHandler} placeholder='Add your own food items' value={this.props.foodOption} />
                <Button label='Add food item' clicked={() => this.props.postFoodOptionHandler('config')} />
            </Aux>
        )
    }
}

export default Config; 