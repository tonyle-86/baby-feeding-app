import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import Aux from '../../../hoc/Aux/Aux';
import axios from 'axios';
import FeedsList from '../FeedsList/FeedsList';
import Form from '../Form/Form';
import Calendar from 'react-calendar';
import '../../UI/Datepicker/Datepicker.scss';
import '../../UI/Calendar/Calendar.scss';
import Button from '../../UI/Button/Button';
import FeedListSingle from '../FeedListSingle/FeedListSingle';

class FeedForm extends Component {

    state = {
        date: new Date(),
        time: new Date(),
        milk: 0,
        notes: '',
        food: [],
        feeds: [],
        isLoading: false,
        hasSubmitted: false,
        calendarDate: new Date(),
        nextDate: new Date(),
        prevDate: new Date()
    };

    handleDateChange = (date) => {
        this.setState({
            date: date
        });
    };

    handleTimeChange = (event) => {
        const x = this.state.date.toISOString().slice(0, 10);
        const y = event.target.value;
        const time = x+'T'+y;

        this.setState({
            time: new Date(time)
        })
    };

    handleCalendarDateChange = ((calendarDate) => {
        this.setState({
            calendarDate: calendarDate
        });
    })

    postDataHandler = () => {
        const payload = {
            date: this.state.date.toDateString(),
            time: this.state.time,
            milk: parseInt(this.state.milk),
            food: [...this.state.food],
            notes: this.state.notes
        };

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
        this.fetchFeedsData();
        this.nextDateHandler()
        this.prevDateHandler();

        let params = (new URL(document.location)).searchParams;
        let date = params.get('date');

        let activeDate,
            nextDate,
            prevDate

        if (date) {
            const formattedDate = `${date.slice(3, 5)}/${date.slice(0, 2)}/${date.slice(6, 10)}`
            activeDate = new Date(formattedDate).toString().slice(0, 15);
            nextDate = new Date(formattedDate);
            prevDate = new Date(formattedDate);
            nextDate.setDate(nextDate.getDate() + 1);
            prevDate.setDate(prevDate.getDate() - 1);
        }

        this.setState({
            calendarDate: date ? new Date(activeDate) : new Date(),
            nextDate: date ? new Date(nextDate): null,
            prevDate: date ? new Date(prevDate) : null
        })

    }

    addAdditionalFoodHandler = () => {
        this.setState(prevState => ({
            food: [...prevState.food, { name: 'Chao', quantity: 1 }]
        }));
    }

    removeFoodHandler = (idx) => {
        let newFood = [...this.state.food];
        newFood.splice(idx,1);
        console.log('array', newFood);

        this.setState({
            food: newFood
        })
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

    nextDateHandler = () => {
        let myDate = new Date(this.state.calendarDate);

        this.setState({
            calendarDate: new Date(myDate.setDate(myDate.getDate() + 1)),
            nextDate: new Date(myDate.setDate(myDate.getDate() + 1)),
            prevDate: new Date(myDate.setDate(myDate.getDate() - 2))
        }
    )}

    prevDateHandler = () => {
        let myDate = new Date(this.state.calendarDate);

        this.setState({
            calendarDate: new Date(myDate.setDate(myDate.getDate() - 1)),
            nextDate: new Date(myDate.setDate(myDate.getDate() + 1)),
            prevDate: new Date(myDate.setDate(myDate.getDate() - 2))
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
                        removeFoodHandler={this.removeFoodHandler.bind(this)}
                        foodChangeHandler={this.foodChangeHandler.bind(this)}
                        foodQuantityHandler={this.foodChangeHandler.bind(this)} 
                        notesHandler={this.notesHandler.bind(this)}
                        postDataHandler={this.postDataHandler.bind(this)}
                    />
                </Route>
                <Route path='/calendar'>
                    <Calendar onChange={this.handleCalendarDateChange} value={this.state.calendarDate}/>
                    <Link to={{
                        pathname: '/by-day',
                        search: `?date=${this.state.calendarDate.toLocaleDateString().slice(0,10)}`
                    }}>
                        <Button label='Submit' selectedDate={this.state.calendarDate} clicked={this.nextDateHandler}/>
                    </Link>
                </Route>
                <Route path='/by-day'>
                    <FeedListSingle title={`Feed for ${this.state.calendarDate.toString().slice(0, 15)}`} {...this.state} nextDateHandler={this.nextDateHandler.bind(this)
                    } prevDateHandler={this.prevDateHandler.bind(this)} componentDidMount={this.componentDidMount.bind(this)}/>
                </Route>
                <Route path='/feedback'>
                    <h1>Feedback</h1>
                </Route>

                {redirectToFeed}
            </Aux>
        )
    }
}

export default FeedForm;