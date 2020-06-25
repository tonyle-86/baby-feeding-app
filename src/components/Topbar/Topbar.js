import React, { Component } from 'react';
//import Logo from '../Logo/Logo';
import Hamburger from '../UI/Hamburger/Hamburger';
import './Topbar.scss';
import Backdrop from '../UI/Backdrop/Backdrop';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

class Topbar extends Component {
    state = {
        navInactive: true
    }

    hamburgerHandler = () => {
        this.setState((prevState) => {
            return { navInactive: !prevState.navInactive };
        });

        if (this.state.navInactive) {
            document.body.style.overflow = 'hidden'
        } else if (!this.state.navInactive) {
            document.body.style.overflow = 'unset'
        }
    }

    render(){

        let backdrop;

        if (!this.state.navInactive) {
            backdrop = <Backdrop navInactive={this.state.navInactive} clicked={this.hamburgerHandler}>
                <NavigationItems />
            </Backdrop>
        }

        return (
            <div className="Topbar">
                <Hamburger navInactive={this.state.navInactive} clicked={this.hamburgerHandler}/>
                <span className='logo'>Baby feeding tracker</span>
                {backdrop}
            </div>
        )
    }
}

export default Topbar;