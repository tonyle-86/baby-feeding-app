import React, { Component } from 'react';
//import Logo from '../Logo/Logo';
import Hamburger from '../UI/Hamburger/Hamburger';
import './Topbar.scss';
import AddFeedButton from '../UI/AddFeedButton/AddFeedButton';
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
                {/* <Logo /> */}
                {/* <NavigationItems /> */}
                <AddFeedButton label="Add Feed" />
            </div>
        )
    }
}

export default Topbar;