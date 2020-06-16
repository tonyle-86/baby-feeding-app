import React, { Component } from 'react';
import './Hamburger.scss';

class Hamburger extends Component {

    render(){
        return (
            <button className={this.props.navInactive ? 'Hamburger Hamburger--minus' : 'Hamburger Hamburger--minus is-active'}  onClick={this.props.clicked} type="button">
                <span className="Hamburger-box">
                    <span className="Hamburger-inner"></span>
                </span>
            </button>
        )
    }

}

export default Hamburger;