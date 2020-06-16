import React, { Component } from 'react';
import Dropdown from '../../UI/Dropdown/Dropdown';
import Textarea from '../../UI/Textarea/Textarea';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../..//UI/Button/Button';
import enGb from 'date-fns/locale/en-GB';
import Datepicker, { registerLocale } from 'react-datepicker';
import Input from '../../UI/Input/Input';
import './Form.scss';
import '../../UI/Datepicker/Datepicker.scss';
import { Link } from 'react-router-dom';
registerLocale('en-gb', enGb);

class Form extends Component {

    render(){
        const addFoodSection = this.props.food.map((item, idx) => {
            return <div key={idx} className="food-section">
                <div className="half-coloumn">
                    <Dropdown  type="food"
                        className="dropdown-food"
                        value={this.props.food[idx].name}
                        changeHandler={event => {
                            const { food } = this.props;
                            food[idx] = {
                                name: event.target.value,
                                quantity: this.props.food[idx].quantity
                            };
                            this.props.foodChangeHandler();
                        }}
                    />
                </div>

                <div className="half-coloumn">
                    <Input key={idx}
                        className="quantity-food"
                        value={this.props.food[idx].quantity}
                        change={event => {
                            const { food } = this.props;
                            food[idx] = {
                                name: this.props.food[idx].name,
                                quantity: event.target.value,
                            };
                            this.props.foodChangeHandler();
                        }}
                    />
                </div>
            </div>

        });

        let foodLabels;

        if (this.props.food.length >= 1) {
            foodLabels = <div className="food-section">
                <div className="half-coloumn"><label>Food:</label></div>
                <div className="half-coloumn"><label>Quantity:</label></div>
            </div>
        }

        const disabledSubmit = (this.props.milk === 0 || this.props.milk === '0') && this.props.food.length === 0 && this.props.notes === '' ? 'hide': null;

        return(

            <Aux>

                <label>Date:</label>
                <Datepicker locale="en-gb" selected={this.props.date} onChange={this.props.handleDateChange} dateFormat="dd/MM/yyyy" />
                <label>Time:</label>
                {/* <Datepicker
                    selected= onChange={this.props.handleTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={5}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                /> */}
                <Input type='time' change={this.props.handleTimeChange} defaultValue={this.props.time.toTimeString().slice(0, 5)}/>
                <Dropdown type="milk" label='Milk' value={this.props.milk} 
                changeHandler={this.props.milkChangeHandler.bind(this)} />

                {foodLabels}
                {addFoodSection}

                <Button styleName="add" label={this.props.food.length === 0 ? 'Add Food' : 'Add Additional Food'} clicked={this.props.addAdditionalFoodHandler} />

                <Textarea label='Notes' changeHandler={this.props.notesHandler.bind(this)}/>

                <div className="FeedForm--button-container">
                    <div className="half-coloumn">
                        <Link to='/summary'>
                            <Button styleName="cancel" label="Cancel" />
                        </Link>
                        
                    </div>
                    <div className="half-coloumn">
                        <Button clicked={this.props.postDataHandler} styleName={disabledSubmit} label="Submit" />
                    </div>
                </div>

            </Aux>

        )
    }
}
export default Form;