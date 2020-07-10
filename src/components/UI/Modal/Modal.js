import React from 'react';
import { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../Button/Button';
import './Modal.scss';

class Modal extends Component {
    render(){
        return(
            <Aux>
                <div className='modal-container'>
                    <h3>{this.props.message}</h3>
                    <Button styleName='cancel' label={this.props.cancelLabel} clicked={this.props.closeModal} />
                    <Button styleName='fr' label={this.props.label} clicked={() => this.props.removeHandler(this.props.fbKey)} />
                </div>
            </Aux>
        )
    }
}

export default Modal;