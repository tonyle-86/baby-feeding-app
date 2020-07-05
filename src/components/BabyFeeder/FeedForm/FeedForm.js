import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import Aux from '../../../hoc/Aux/Aux';
import axios from 'axios';
import Summary from '../Summary/Summary';
import Form from '../Form/Form';
import Calendar from 'react-calendar';
import '../../UI/Datepicker/Datepicker.scss';
import '../../UI/Calendar/Calendar.scss';
import Button from '../../UI/Button/Button';
import FeedListSingle from '../FeedListSingle/FeedListSingle';
import Config from '../../Config/Config';

class FeedForm extends Component {

    state = {
        date: new Date(),
        time: new Date(),
        simpleTime: new Date().toTimeString().slice(0, 5),
        milk: 0,
        notes: '',
        foodOption:'',
        foodOptionsArr: [],
        food: [],
        feeds: [],
        feedsLength: 0,
        isLoading: false,
        hasSubmitted: false,
        calendarDate: new Date(),
        nextDate: new Date(),
        prevDate: new Date(),
        test: [],
        noOfResultsToShow: 2,
        fbKey: '',
        nappies: 'none',
        
    };

    handleDateChange = (date) => {
        this.setState({
            date: date,
            time: new Date(date)
        });
    };

    handleTimeChange = (event) => {
        const x = this.state.date.toISOString().slice(0, 10);
        const y = event.target.value;
        const timeOffset = new Date().getTimezoneOffset();
        let time = x+'T'+y+'Z';

        time = new Date(time);
        time = new Date(time.getTime() + (timeOffset * 60 * 1000));

        this.setState({
            time: new Date(time)
        })
    };

    handleCalendarDateChange = ((calendarDate) => {
        this.setState({
            calendarDate: calendarDate
        });
    })

    postFoodOptionHandler = (page) => {
        const payload = {
            foodOption: this.state.foodOption
        };
        if(page !== 'config'){
            this.addFoodOptionHandler();
        }

        axios.post('https://baby-feeder-uat-185a3.firebaseio.com/foodItems.json', payload)
            .then(response => {
                this.fetchFoodOptionsHandler();
                this.setState({
                    foodOption: ''
                });
            })
            .catch(error => {
                console.log(error);
            })
    };

    fetchFoodOptionsHandler = () => {
        axios.get('https://baby-feeder-uat-185a3.firebaseio.com/foodItems.json')
            .then(response => {
                if (response.data) {
                    const foodObj = Object.keys(response.data);
                    let foodOptionsArr = foodObj.map((i,idx) => {
                        return { fbKey: foodObj[idx], food: response.data[i].foodOption }
                    })
                    .sort((a, b) => {
                        if (a.food < b.food) {
                            return -1;
                        }

                        if (a.food > b.food) {
                            return 1;
                        }
                        return 0;
                    });
                    this.setState({
                        foodOptionsArr: foodOptionsArr
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    postDataHandler = () => {
        const payload = {
            date: this.state.date.toDateString(),
            time: this.state.time.toString(),
            simpleTime: this.state.time.toTimeString().slice(0, 5),
            milk: parseInt(this.state.milk),
            food: [...this.state.food],
            foodOption: this.state.foodOption,
            notes: this.state.notes,
            nappies: this.state.nappies
        };

        axios.post('https://baby-feeder-uat-185a3.firebaseio.com/feeds.json', payload)
        .then(response => {
            this.setState({
                date: new Date(),
                time: new Date(),
                simpleTime: new Date().toTimeString().slice(0, 5),
                milk: 0,
                notes: '',  
                food: [],
                nappies:'none',
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
                let feedsByDate = feedsObj.map((i,idx) => {
                    const keyObj = {fbKey : feedsObj[idx]};

                    return {...response.data[i],...keyObj};
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

                let feedsLength = Object.entries(feedsGroupedByDate).length;

                let test = Object.entries(feedsGroupedByDate).slice(0,this.state.noOfResultsToShow);

                this.setState({
                    feeds: feedsGroupedByDate,
                    isLoading: false,
                    hasSubmitted: false,
                    feedsLength: feedsLength,
                    test: test
                });
            } else {
                this.setState({
                    feeds: []
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    getLatestFeeds = () => {
        if (this.state.isLoading) {
            this.fetchFeedsData();
        }
    }

    componentDidMount() {
        this.fetchFeedsData();
        this.fetchFoodOptionsHandler();
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

    addAdditionalFoodHandler = (foodItem) => {        
        if(foodItem.length){
            this.postFoodOptionHandler();
        }
        this.setState(prevState => ({
            food: [...prevState.food, { name: 'Banana', quantity: 1 }]
        }));
    }

    removeFoodHandler = (idx) => {
        let newFood = [...this.state.food];
        newFood.splice(idx,1);

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

    foodOptionHandler = (event) => {
        this.setState({
            foodOption: event.target.value
        })
    }

    addFoodOptionHandler = () => {
        this.setState(prevState => ({
            food: [...prevState.food, { name: this.state.foodOption, quantity: 1 }]
        }));
    }

    removeFoodOptionHandler = (foodItem, idx) => {
        axios.delete(`https://baby-feeder-uat-185a3.firebaseio.com/foodItems/${foodItem}.json`)
        .then((response) => {
            if(response){
                this.setState({
                    foodOptionsArr: this.state.foodOptionsArr.filter((_, i) => i !== idx)
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    getDate = () => {
        let params = (new URL(document.location)).searchParams;
        let date = params.get('date');

        const formattedDate = `${date.slice(3, 5)}/${date.slice(0, 2)}/${date.slice(6, 10)}`
        return new Date(formattedDate).toString().slice(0, 15);
    }        
    
    removeFeedItemHandler = (feedItem, idx) => {
        axios.delete(`https://baby-feeder-uat-185a3.firebaseio.com/feeds/${feedItem}.json`)
        .then((response) => {
            if(response){
                this.fetchFeedsData();
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    editFormHandler = () => {
        // <Route path='/edit'>



        // </Route>
    }

    // removeFeedItemHandler = (feedItem, idx) => {
    //     const payload 
    //     axios.puts(`https://baby-feeder-uat-185a3.firebaseio.com/feeds/${feedItem}.json`,payload)
    //         .then((response) => {
    //             if (response) {
    //                 console.log(response);
    //                 this.fetchFeedsData();
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //     })
    // }

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

    calendarSubmit = () => {
        let myDate = new Date(this.state.calendarDate);

        this.setState({
            calendarDate: new Date(myDate.setDate(myDate.getDate())),
            nextDate: new Date(myDate.setDate(myDate.getDate() + 1)),
            prevDate: new Date(myDate.setDate(myDate.getDate() - 2))
        }
        )
    }

    prevDateHandler = () => {
        let myDate = new Date(this.state.calendarDate);

        this.setState({
            calendarDate: new Date(myDate.setDate(myDate.getDate() - 1)),
            nextDate: new Date(myDate.setDate(myDate.getDate() + 1)),
            prevDate: new Date(myDate.setDate(myDate.getDate() - 2))
        })
    }

    loadMore = () => {
        this.fetchFeedsData();
        this.setState(prevState => ({
            noOfResultsToShow: prevState.noOfResultsToShow + 3, 
        })
    )}

    nappyHandler = (event) => {
        this.setState({
            nappies: event.target.value
        })
    }

    clickEditHandler = (fbKey, simpleTime) => {
        this.setState({
            fbKey: fbKey,
            simpleTime: simpleTime
        })
        this.getFeedItem(fbKey)
    }

    getFeedItem = (fbKey) => {
        axios.get(`https://baby-feeder-uat-185a3.firebaseio.com/feeds/${fbKey}.json`)
            .then((response => {
                const data = response.data;
                this.setState({
                    date: new Date(data.date),
                    time: new Date(data.time),
                    simpleTime: data.simpleTime,
                    milk: data.milk,
                    food: data.food ? data.food : [],
                    // foodOption: this.state.foodOption,
                    notes: data.notes,
                    nappies: data.nappies
                })
        }))
    }

    updateFeedItem = () => {
        console.log('UPDATED FEED ITEM');
    }

    render() {
        let redirectToFeed, loadMore =  null;

        if(this.state.hasSubmitted){
            redirectToFeed = <Redirect to='/summary' />
        }

        if (this.state.noOfResultsToShow < this.state.feedsLength) {
            loadMore = <Button styleName='width-100' label='Load more' clicked={this.loadMore} />
        }

        return (
            <Aux>
                <Route path='/summary' exact>
                    <Summary label='Summary' {...this.state} componentDidMount={this.componentDidMount.bind(this)}/>
                    {loadMore}
                </Route>
                <Route path={['/add-feed']} exact>
                    <Form {...this.state} 
                        label='Add feed'
                        submitLabel='Submit'
                        handleDateChange={this.handleDateChange.bind(this)} 
                        handleTimeChange={this.handleTimeChange.bind(this)}
                        milkChangeHandler={this.milkChangeHandler.bind(this)}
                        addAdditionalFoodHandler={this.addAdditionalFoodHandler.bind(this)}
                        removeFoodHandler={this.removeFoodHandler.bind(this)}
                        foodChangeHandler={this.foodChangeHandler.bind(this)}
                        foodQuantityHandler={this.foodChangeHandler.bind(this)}
                        nappyHandler={this.nappyHandler.bind(this)} 
                        notesHandler={this.notesHandler.bind(this)}
                        postDataHandler={this.postDataHandler.bind(this)}
                        foodOptionHandler={this.foodOptionHandler.bind(this)}
                        postFoodOptionHandler={this.postFoodOptionHandler.bind(this)}
                        updateFeedItem={this.updateFeedItem.bind(this)}
                    />
                </Route>
                <Route path='/calendar'>
                    <h2>Calendar</h2>
                    <Calendar onChange={this.handleCalendarDateChange} value={this.state.calendarDate}/>
                    <Link to={{
                        pathname: '/by-day',
                        search: `?date=${this.state.calendarDate.toLocaleDateString().slice(0,10)}`
                    }}>
                        <Button label='Proceed' selectedDate={this.state.calendarDate} clicked={this.calendarSubmit}/>
                    </Link>
                </Route>
                <Route path='/by-day'>
                    <FeedListSingle {...this.state} 
                        nextDateHandler={this.nextDateHandler.bind(this)} 
                        prevDateHandler={this.prevDateHandler.bind(this)} 
                        clickEditHandler={this.clickEditHandler.bind(this)}
                        // componentDidMount={this.componentDidMount.bind(this)} 
                        removeFeedItemHandler={this.removeFeedItemHandler.bind(this)} />
                </Route>
                <Route path={['/edit']} exact>
                    <Form {...this.state}
                        label='Edit feed'
                        submitLabel='Save edits'
                        handleDateChange={this.handleDateChange.bind(this)}
                        handleTimeChange={this.handleTimeChange.bind(this)}
                        milkChangeHandler={this.milkChangeHandler.bind(this)}
                        addAdditionalFoodHandler={this.addAdditionalFoodHandler.bind(this)}
                        removeFoodHandler={this.removeFoodHandler.bind(this)}
                        foodChangeHandler={this.foodChangeHandler.bind(this)}
                        foodQuantityHandler={this.foodChangeHandler.bind(this)}
                        nappyHandler={this.nappyHandler.bind(this)}
                        notesHandler={this.notesHandler.bind(this)}
                        postDataHandler={this.updateFeedItem.bind(this)}
                        foodOptionHandler={this.foodOptionHandler.bind(this)}
                    />
                </Route>
                <Route path='/config'>
                    <Config label='Config' {...this.state} 
                        foodOptionHandler={this.foodOptionHandler.bind(this)}
                        postFoodOptionHandler={this.postFoodOptionHandler.bind(this)}
                        removeFoodOptionHandler={this.removeFoodOptionHandler.bind(this)}
                        />
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