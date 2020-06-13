import React, { Component } from 'react';
import './Hamburger.scss';

class Hamburger extends Component {

    state = {
        navActive: true
    }

    // hamburgerHandler = () => {
    //     console.log(this.state.navActive);
    //     this.setState((prevState) => {
    //         return { navActive: !prevState.navActive };
    //     });
    // }

    render(){
        return (
            <button className={this.props.navActive ? 'Hamburger Hamburger--minus' : 'Hamburger Hamburger--minus is-active'}  onClick={this.props.clicked} type="button">
                <span className="Hamburger-box">
                    <span className="Hamburger-inner"></span>
                </span>
            </button>
        )
    }

}

export default Hamburger;