import React, { Component } from 'react';
import Dropdown from '../../UI/Dropdown/Dropdown';
import Textarea from '../../UI/Textarea/Textarea';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../..//UI/Button/Button';
import enGb from 'date-fns/locale/en-GB';
import Datepicker, { registerLocale } from 'react-datepicker';
import Input from '../../UI/Input/Input';
import Radio from '../../UI/Radio/Radio';
import './Form.scss';
import '../../UI/Datepicker/Datepicker.scss';
import { Link } from 'react-router-dom';
registerLocale('en-gb', enGb);

class Form extends Component {

    render(){
        let addFoodOption;

        const addFoodSection = this.props.food.map((item, idx) => {
            return <div key={idx} className='coloumn-container'>

                <div className='half-coloumn half-coloumn--alt'>
                    <Dropdown type='food'
                        foodOptionsArr={this.props.foodOptionsArr}
                        className='dropdown-food'
                        value={this.props.food[idx].name}
                        test={() => this.props.test}
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
                
                <div className='half-coloumn half-coloumn--alt'>
                    <Input key={idx}
                        
                        type='number'
                        pattern='\d*'
                        className='quantity-food'
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

                <div className='trash'>                
                    <span className='icon' onClick={() => this.props.removeFoodHandler(idx)}>   
                        <i className='fa fa-trash-o fa-1-5x' aria-hidden='true'></i>                                  
                    </span>
                </div>
                
            </div>

        });

        let foodLabels;

        if (this.props.food.length >= 1) {
            foodLabels = <div className='coloumn-container'>
                <div className='half-coloumn half-coloumn--alt'><label>Food:</label></div>
                <div className='half-coloumn half-coloumn--alt'><label>Quantity:</label></div>
                <div className='trash'></div>     
            </div>
        }

        if (this.props.food.length >= 1) {
            addFoodOption = <Aux>
                <div className='coloumn-container'>
                    <div className='half-coloumn half-coloumn--alt'>
                        <Input change={this.props.foodOptionHandler} placeholder='Add your own food items' value={this.props.foodOption} />
                    </div>  
                    <div className='half-coloumn half-coloumn--alt'>
                        {this.props.foodOption.length ? <Button styleName='width-100' label='Add food item' clicked={this.props.postFoodOptionHandler} /> : null}
                    </div>  
                    <div className='trash'></div>
                </div>
            </Aux>
        
        }

        const disabledSubmit = (this.props.milk === 0 || this.props.milk === '0') && this.props.nappies.wet === 0 && this.props.nappies.dirty === 0 && this.props.food.length === 0 && this.props.notes === '' ? 'hide': null;

        return(

            <Aux>
                <h2>{this.props.label} <i className="fa fa-cutlery" aria-hidden="true"></i></h2>
                <div className='coloumn-container'>
                    <div className='half-coloumn'>
                        <label>Date:</label>
                        <Datepicker locale='en-gb' selected={this.props.date} onChange={this.props.handleDateChange} dateFormat='dd/MM/yyyy' />
                    </div>
                    <div className='half-coloumn'>
                    <label>Time:</label>
                    <Input type='time' change={this.props.handleTimeChange} defaultValue={this.props.time.toTimeString().slice(0, 5)}/>
                    </div></div>


                <Dropdown type='milk' label='Milk' value={this.props.milk} 
                changeHandler={this.props.milkChangeHandler.bind(this)} />

                {foodLabels}
         
                {addFoodSection}

                {addFoodOption}

                <Button styleName='add width-100' label={this.props.food.length === 0 ? 'Add Food' : 'Add Additional Food'} clicked={() => this.props.addAdditionalFoodHandler(this.props.foodOption)} />

                <div className='nappy-type radio-container coloumn-container'>
                    <div className='full-coloumn'>
                        <label>Nappy:</label>
                    </div>
                    <div className='third-coloumn'>
                        <Radio type='radio' change={this.props.nappyHandler}
                            label={<Aux><i className="fa fa-ban fa-1-5x" aria-hidden="true"></i><span>None</span></Aux>} name='nappy' id='none' />
                    </div>
                    <div className='third-coloumn'>
                        <Radio type='radio' change={this.props.nappyHandler} 
                            label={<Aux><i className="fa fa-nappy-wet fa-1-5x" aria-hidden="true"></i><span>Wet</span></Aux>} 
                        name='nappy' id='wet' />
                    </div>
                    <div className='third-coloumn'>
                        <Radio type='radio' change={this.props.nappyHandler} 
                            label={<Aux><i className="fa fa-nappy-dirty fa-1-5x" aria-hidden="true"></i><span>Dirty</span></Aux>} name='nappy' id='dirty' />
                    </div>
                    
                </div>

                <div>
                    <Textarea label='Notes' changeHandler={this.props.notesHandler.bind(this)} value={this.props.notes}/>
                </div>
                

                <div className='coloumn-container'>
                    <div className='half-coloumn'>
                        <Link to='/summary'>
                            <Button styleName='cancel width-100' label='Cancel'/>
                        </Link>
                        
                    </div>
                    <div className='half-coloumn'>
                        <Button clicked={this.props.postDataHandler} styleName={`${disabledSubmit} submit width-100`} label='Submit' />
                    </div>
                </div>

            </Aux>

        )
    }
}
export default Form;