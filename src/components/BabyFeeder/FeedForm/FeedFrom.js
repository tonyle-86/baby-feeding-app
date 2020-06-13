import React, { Component } from 'react';
import { Route, Redirect, NavLink, Switch } from 'react-router-dom';
import Aux from '../../../hoc/Aux/Aux';
import axios from 'axios';
import FeedsList from '../FeedsList/FeedsList';
import Form from '../Form/Form';

class FeedForm extends Component {

    state = {
        date: new Date(),
        time: new Date(),
        milk: 0,
        notes: '',
        food: [],
        feeds: [],
        isLoading: false,
        hasSubmitted: false
    };

    handleDateChange = (date) => {
        this.setState({
            date: date
        });
    };

    handleTimeChange = (time) => {
        this.setState({
            time: time
        });
    };

    postDataHandler = () => {
        const payload = {
            date: this.state.date.toDateString(),
            time: this.state.time,
            milk: parseInt(this.state.milk),
            food: [...this.state.food],
            notes: this.state.notes
        };

        console.log(payload.time);

        axios.post('https://baby-feeder-uat-185a3.firebaseio.com/feeds.json', payload)
        .then(response => {
            this.setState({
                date: new Date(),
                time: new Date(),
                milk: 0,
                notes: '',  
                food: [],
                hasSubmitted: true,
                isLoading: true
            });
            this.getLatestFeeds();
        })
        .catch(error => {
            console.log(error);
        })
    };

    fetchFeedsData = () => {
        axios.get('https://baby-feeder-uat-185a3.firebaseio.com/feeds.json')
        .then(response => {
            if (response.data) {
                const feedsObj = Object.keys(response.data);
                let feedsByDate = feedsObj.map(i => {
                    return response.data[i];
                })
                .sort((x, y) => {
                    return new Date(y.time) - new Date(x.time);
                })
                .sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                })

                const sortByDateArr = [...feedsByDate];

                const groupBy = (array, key) => {
                    return array.reduce((result, currentValue) => {

                        (result[currentValue[key]] = result[currentValue[key]] || []).push(
                            currentValue
                        );
                        return result;
                    }, {});
                };

                const feedsGroupedByDate = groupBy(sortByDateArr, 'date');

                this.setState({
                    feeds: feedsGroupedByDate,
                    isLoading: false,
                    hasSubmitted: false
                });


                
            }



            
        })
        .catch(error => {
            console.log(error);
        })
    }

    getLatestFeeds = () => {
        if (this.state.isLoading) {
            this.fetchFeedsData()
        }
    }

    componentDidMount() {
        this.fetchFeedsData()
    }

    addAdditionalFoodHandler = () => {
        this.setState(prevState => ({
            food: [...prevState.food, { name: 'Chao', quantity: 1 }]
        }));
    }

    foodChangeHandler = () => {
        const { food } = this.state;
        this.setState({
            food
        });
    }
    
    milkChangeHandler = event => {
        this.setState({
            milk: event.target.value
        })
    }

    notesHandler = event => {
        this.setState({
            notes: event.target.value
        })
    }

    render() {
        let redirectToFeed =  null;
        if(this.state.hasSubmitted){
            redirectToFeed = <Redirect to='/summary' />
        }
        return (
            <Aux>
                <Route path='/summary' exact>
                    <FeedsList {...this.state} componentDidMount={this.componentDidMount.bind(this)}/>
                </Route>
                <Route path='/add-feed' exact>
                    <Form {...this.state} 
                        handleDateChange={this.handleDateChange.bind(this)} 
                        handleTimeChange={this.handleTimeChange.bind(this)}
                        milkChangeHandler={this.milkChangeHandler.bind(this)}
                        addAdditionalFoodHandler={this.addAdditionalFoodHandler.bind(this)}
                        foodChangeHandler={this.foodChangeHandler.bind(this)}
                        foodQuantityHandler={this.foodChangeHandler.bind(this)} 
                        notesHandler={this.notesHandler.bind(this)}
                        postDataHandler={this.postDataHandler.bind(this)}
                    />
                </Route>

                {redirectToFeed}
            </Aux>
        )
    }
}

export default FeedForm;