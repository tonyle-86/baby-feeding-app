import React from 'react';
//import Logo from '../Logo/Logo';
//import Hamburger from '../UI/Hamburger/Hamburger';
import './Topbar.scss';
import AddFeedButton from '../UI/AddFeedButton/AddFeedButton';
//import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

const topbar = () => {
    return (
        <div className="Topbar">
            {/* <Hamburger /> */}
            {/* <Logo /> */}
            {/* <NavigationItems /> */}
            <AddFeedButton label="Add Feed" />
        </div>
    )
}

export default topbar;