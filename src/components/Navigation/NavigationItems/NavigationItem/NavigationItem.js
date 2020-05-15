import React from 'react';
import './NavigationItem.scss';
import Aux from '../../../../hoc/Aux/Aux';

const navigationItem = () => {
    return (
        <Aux>
            <li className="NavigationItem"><a href="">Link 1</a></li>
            <li className="NavigationItem"><a href="">Link 2</a></li>
            <li className="NavigationItem"><a href="">Link 3</a></li>
        </Aux>
    );
}

export default navigationItem;