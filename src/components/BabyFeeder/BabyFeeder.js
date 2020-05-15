import React, { Component } from 'react';
import FeedForm from './FeedForm/FeedFrom';
import './BabyFeeder.scss';

class BabyFeeder extends Component {

    render() {
        return (
            <div className="BabyFeeder">
                <FeedForm />
            </div>
        )
    }
}

export default BabyFeeder;