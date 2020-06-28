import React, { Component } from 'react';
import Radio from '../../UI/Radio/Radio';
import Textarea from '../../UI/Textarea/Textarea';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../..//UI/Button/Button';
import enGb from 'date-fns/locale/en-GB';
import Datepicker, { registerLocale } from 'react-datepicker';
import Input from '../../UI/Input/Input';
import '../Form/Form.scss';
import '../../UI/Datepicker/Datepicker.scss';
import { Link } from 'react-router-dom';
registerLocale('en-gb', enGb);

class NappyForm extends Component {

    render(){
        



        // const disabledSubmit = (this.props.milk === 0 || this.props.milk === '0') && this.props.food.length === 0 && this.props.notes === '' ? 'hide': null;

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
                    </div>
                </div>

                <Radio type='radio' change={this.props.nappyHandler} label='Wet nappy' name='nappy' id='wet'/>
                <Radio type='radio' change={this.props.nappyHandler} label='Dirty nappy' name='nappy' id='dirty' />

                <Textarea label='Notes' changeHandler={this.props.notesHandler.bind(this)}/>

                <div className='coloumn-container'>
                    <div className='half-coloumn'>
                        <Link to='/summary'>
                            <Button styleName='cancel width-100' label='Cancel'/>
                        </Link>
                        
                    </div>
                    <div className='half-coloumn'>
                        <Button clicked={this.props.postDataHandler} styleName={` submit width-100`} label='Submit' />
                    </div>
                </div>

            </Aux>

        )
    }
}
export default NappyForm;