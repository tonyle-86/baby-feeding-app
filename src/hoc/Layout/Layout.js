import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Topbar from '../../components/Topbar/Topbar';
import BabyFeeder from '../../components/BabyFeeder/BabyFeeder';

class Layout extends Component {
    render() {
        return (

            <Aux>
                <Topbar />
                <BabyFeeder />
            </Aux>
        )
    }
}

export default Layout;