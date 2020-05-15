import React from 'react';
import './Hamburger.scss';

const hamburger = () => {
    return (
        <button className="Hamburger Hamburger--minus" type="button">
            <span className="Hamburger-box">
                <span className="Hamburger-inner"></span>
            </span>
        </button>
    )
}

export default hamburger;