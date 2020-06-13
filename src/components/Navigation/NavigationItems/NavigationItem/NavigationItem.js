import React from 'react';
import './NavigationItem.scss';
import { Route, Redirect, NavLink, Link } from 'react-router-dom';
import Aux from '../../../../hoc/Aux/Aux';

const navigationItem = () => {
    return (
        <Aux>
            <li className="NavigationItem">
                <NavLink to="/summary">Summary</NavLink>
            </li>
            <li className="NavigationItem"><NavLink to="/add-feed">Add Feed</NavLink></li>
            <li className="NavigationItem"><NavLink to="/feedback">Feedback</NavLink></li>
        </Aux>
    );
}

export default navigationItem;