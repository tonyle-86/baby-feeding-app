import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import Dropdown from '../../UI/Dropdown/Dropdown';
import Textarea from '../../UI/Textarea/Textarea';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../..//UI/Button/Button';
import './FeedForm.scss';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import '../../UI/Datepicker/Datepicker.scss';

class FeedForm extends Component {
    state = {
        date: new Date(),
        time: '',
        amount: 10,
        notes: ''
    };

    handleChange = date => {
        this.setState({
            date: date
        });
    };

    postDataHandler = () => {
        const feed = {
            date: this.state.date.toISOString(),
            time: this.state.time,
            amount: this.state.amount,
            notes: this.state.notes
        };

        axios.post('https://baby-feeder-uat-185a3.firebaseio.com/feeds.json', feed)
        .then(response=> {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }


    render() {
        return (
            <Aux>
                <DatePicker selected={this.state.date} onChange={this.handleChange} />
                {/* <Input label="Date" value={this.state.date} change={(event) => this.setState({date: event.target.value})}/>            */}
                <Input label="Time" value={this.state.time} change={(event) => this.setState({time: event.target.value })}/>
                <Dropdown label='Amount' value={this.state.amount} change={(event) => this.setState({ amount: event.target.value })}/>
                <Textarea label='Notes' value={this.state.notes} change={(event) => this.setState({notes: event.target.value })}/>
                <div className="FeedForm--button-container">                
                    <Button styleName="cancel" label="Cancel" />
                    <Button clicked={this.postDataHandler} styleName="" label="Submit"/>
                </div>


            </Aux>
        )
    }
}

export default FeedForm;