import React from 'react';
import './NavigationItems.scss';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = () => {
    return(
        <ul className="NavigationItems">
            <NavigationItem />
        </ul>
    );
}

export default navigationItems;