import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import Dropdown from '../../UI/Dropdown/Dropdown';
import Textarea from '../../UI/Textarea/Textarea';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../..//UI/Button/Button';
import './FeedForm.scss';
import axios from 'axios';
import Datepicker from 'react-datepicker';
import '../../UI/Datepicker/Datepicker.scss';

class FeedForm extends Component {

    state = {
        date: new Date(),
        time: new Date(),
        amount: 10,
        notes: ''
    };

    formatDate = (newDate) => {
        newDate = this.state.date.toJSON().slice(0, 10);

        return newDate.replace(/-/g, '/').split('/').reverse().join('/');
    }

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
            date: this.state.date.toLocaleDateString(),
            time: this.state.time.toLocaleTimeString().slice(0, 5),
            amount: this.state.amount,
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
    }

    render() {
        return (
            <Aux>
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