import React, { Component } from 'react';
//import Logo from '../Logo/Logo';
import Hamburger from '../UI/Hamburger/Hamburger';
import './Topbar.scss';
import AddFeedButton from '../UI/AddFeedButton/AddFeedButton';
import Backdrop from '../UI/Backdrop/Backdrop';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

class Topbar extends Component {
    state = {
        navActive: true
    }

    hamburgerHandler = () => {
        this.setState((prevState) => {
            return { navActive: !prevState.navActive };
        });
    }

    render(){

        let backdrop;

        if (!this.state.navActive) {
            backdrop = <Backdrop navActive={this.state.navActive} clicked={this.hamburgerHandler}>
                <NavigationItems />
            </Backdrop>
        }

        return (
            <div className="Topbar">
                <Hamburger navActive={this.state.navActive} clicked={this.hamburgerHandler}/>
                {backdrop}
                {/* <Logo /> */}
                {/* <NavigationItems /> */}
                <AddFeedButton label="Add Feed" />
            </div>
        )
    }
}

export default Topbar;