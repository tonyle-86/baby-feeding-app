import React, { Component } from 'react';
import FeedForm from './FeedForm/FeedForm';
import { Route } from 'react-router-dom';
import './BabyFeeder.scss';

class BabyFeeder extends Component {

    render() {
        return (
            <div className="BabyFeeder">
                <Route path='/' component={FeedForm}>
                </Route>
            </div>
        )
    }
}

export default BabyFeeder;