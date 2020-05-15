import React from 'react';
import logoImage from '../../assets/images/babybottle.png';
import './Logo.scss';
import Aux from '../../hoc/Aux/Aux';

const logo = () => {
    return (
        <div className="LogoContainer">
            {/* <img alt="Logo" className="Logo" src={logoImage} /> */}
            Baby feeder
        </div>
    )
}

export default logo;