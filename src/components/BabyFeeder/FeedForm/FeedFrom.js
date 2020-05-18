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

class FeedForm extends Component {

    state = {
        date: new Date(),
        time: new Date(),
        amount: 10,
        notes: '',
        feeds: []
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
        const feed = {
            date: this.state.date.toISOString().slice(0,10),
            time: this.state.time.toLocaleTimeString(),
            amount: parseInt(this.state.amount),
            notes: this.state.notes
        };

        axios.post('https://baby-feeder-uat-185a3.firebaseio.com/feeds.json', feed)
        .then(response => {
            console.log(response);
            this.setState({
                date: new Date(),
                time: new Date(),
                amount: 10,
                notes: ''
            })
        })
        .catch(error => {
            console.log(error);
        })
    };

    componentDidMount() {
        axios.get('https://baby-feeder-uat-185a3.firebaseio.com/feeds.json')
        .then(response => {
            if (response.data) {       
                const feedsObj = Object.keys(response.data);
                let feedsByDate = feedsObj.map(i => {
                    return response.data[i];
                })
                .sort((a,b) => {
                    return new Date(b.date) - new Date(a.date);
                });

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
                    feeds: feedsGroupedByDate
                });
            }
        })
    }

    render() {

        let feeds = Object.keys(this.state.feeds);

        let groupDates = feeds.map((item,idx) => {
            return <FeedDate key={idx} date={item}>
                {this.state.feeds[item].map(x => {
                    return <FeedDetail key={x.time} amount={x.amount} time={x.time} notes={x.notes}/>
                })}
            </FeedDate>
        })

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
                <Dropdown label='Amount' value={this.state.amount} change={(event) => this.setState({ amount: event.target.value })}/>
                <Textarea label='Notes' change={(event) => this.setState({notes: event.target.value })}/>
                <div className="FeedForm--button-container">                
                    <Button styleName="cancel" label="Cancel" />
                    <Button clicked={this.postDataHandler} styleName="" label="Submit"/>
                </div>

            </Aux>
        )
    }
}

export default FeedForm;