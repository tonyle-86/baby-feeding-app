import React, { Component } from 'react';
import Dropdown from '../../UI/Dropdown/Dropdown';
import Textarea from '../../UI/Textarea/Textarea';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../..//UI/Button/Button';
import './FeedForm.scss';
import axios from 'axios';
import Datepicker from 'react-datepicker';
import '../../UI/Datepicker/Datepicker.scss';
import FeedDate from '../FeedItem/FeedDate';
import FeedDetail from '../FeedItem/FeedDetail';
import Input  from '../../UI/Input/Input';

class FeedForm extends Component {

    state = {
        date: new Date(),
        time: new Date(),
        milk: 10,
        notes: '',
        food: [],
        feeds: [],
        isLoading: false
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
            date: this.state.date.toISOString().slice(0, 10),
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
                milk: 10,
                notes: '',  
                food: [],
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
                    isLoading: false
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

    addAdditionalFood = () => {
        this.setState(prevState => ({
            food: [...prevState.food, { name: 'Chao', quantity: 1 }]
        }));
    }

    render() {

        let feeds = Object.keys(this.state.feeds);

        let getMilkTotal = feeds.map((item,idx) => {
            return this.state.feeds[item].reduce((a,cv) => {
                return a + cv.milk
            },0)
        })

        let groupDates = feeds.map((item,idx) => {
            return <FeedDate key={idx} date={item} total={getMilkTotal[idx]}>{this.state.feeds[item].map(x => {
                let foodEatenAtTime;
                if (x.food) {
                    foodEatenAtTime = x.food.map((item, idx) => {
                        return item.name;
                    })
                }
                console.log(foodEatenAtTime)
                return <FeedDetail food={x.food ? foodEatenAtTime : null } key={x.time + x.milk + getMilkTotal[idx]} milk={x.milk} time={x.time} notes={x.notes}/> 
            })}</FeedDate>
        })

        const addFoodSection = this.state.food.map((item, idx) => {

            return <div className="food-section">
                
                <div className="half-coloumn">
                    <Dropdown type="food"
                        className="dropdown-food"
                        key={idx}
                        value={this.state.food[idx].name}
                        change={event => {
                            const { food } = this.state;
                            food[idx] = {
                                name: event.target.value,
                                quantity: this.state.food[idx].quantity
                            };
                            this.setState({
                                food
                            });
                        }}
                    />
                </div>

                <div className="half-coloumn">
                    <Input 
                        className="quantity-food"
                        value={this.state.food[idx].quantity}
                        change={event => {
                            const { food } = this.state;
                            food[idx] = {
                                name: this.state.food[idx].name,
                                quantity: event.target.value,
                            };
                            this.setState({
                                food
                            });
                        }}
                    />
                </div>
            </div>
            
        });

        let foodLabels;
        
        if (this.state.food.length >= 1)  {
            foodLabels = <div className="food-section">
                <div className="half-coloumn"><label>Food:</label></div>
                <div className="half-coloumn"><label>Quantity:</label></div>
            </div>
        }

        return (
            <Aux>

                {groupDates}

                <label>Date:</label>
                <Datepicker selected={this.state.date} onChange={this.handleDateChange} dateFormat="dd/MM/yyyy" />
                <label>Time:</label>
                <Datepicker
                    selected={this.state.time} onChange={this.handleTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={5}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                />
                <Dropdown type="milk" label='milk' value={this.state.milk} change={(event) => this.setState({ milk: event.target.value })}/>
                
                {foodLabels}
                {addFoodSection}    

                <Button styleName="add" label={this.state.food.length === 0 ? 'Add Food' : 'Add Additional Food'} clicked={this.addAdditionalFood}/>

                <Textarea label='Notes' change={(event) => this.setState({notes: event.target.value })}/>
                <div className="FeedForm--button-container">
                    <div className="half-coloumn">
                        <Button styleName="cancel" label="Cancel" />
                    </div>                
                    <div className="half-coloumn">
                        <Button clicked={this.postDataHandler} styleName="" label="Submit"/>
                    </div>
                </div>

            </Aux>
        )
    }
}

export default FeedForm;