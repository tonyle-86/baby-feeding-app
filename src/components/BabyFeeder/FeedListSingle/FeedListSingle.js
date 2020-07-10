import React, { Component } from 'react';
import FeedDetail from '../FeedItem/FeedDetail';
import Aux from '../../../hoc/Aux/Aux';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import FeedTotal from '../FeedItem/FeedTotal';
import FeedDate from '../FeedItem/FeedDate';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Modal from '../../UI/Modal/Modal';
import axios from 'axios';


class FeedListSingle extends Component {

    state = {
        removeToggle: false,
        modalOpen: false,
        deleting: false
    }

    dateNoSlash = (date) => {
        let dateNew = date.toLocaleDateString().slice(0, 10);
        dateNew = dateNew.replace(/\//g, '');
        return dateNew
    }

    removeToggleHandler = () => {
        this.setState((prevState) => {
            return { removeToggle: !prevState.removeToggle };
        });
    }

    getDate = () => {
        let date = this.props.match.params.id;
        const formattedDate = `${date.slice(2, 4)}/${date.slice(0, 2)}/${date.slice(4, 8)}`
        return new Date(formattedDate).toString().slice(0, 15);
    }

    removeFeedItemHandler = (feedItem, idx) => {
        axios.delete(`https://baby-feeder-uat-185a3.firebaseio.com/feeds/${feedItem}.json`)
            .then((response) => {
                if (response) {
                    this.setState({
                        modalOpen: false,
                        fbKey: '',
                        deleting: false
                    })
                    this.props.fetchFeedsData();
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    openModal = (fbKey) => {
        this.setState({
            modalOpen: true,
            fbKey: fbKey,
            deleting: true
        })
    }

    closeModal = () => {
        console.log('close Modal');
        this.setState({
            modalOpen: false
        })
    }

    render() {
        const feeds = Object.keys(this.props.feeds);

        let selectedDate, filterByDate, modal;

        if (this.state.modalOpen) {
            modal = <Backdrop>
                <Modal message='Are you sure you want to delete?' fbKey={this.state.fbKey} closeModal={this.closeModal.bind(this)} removeHandler={this.removeFeedItemHandler} label='Confirm' cancelLabel='Cancel'/>
            </Backdrop>
        }

        filterByDate = feeds.filter(i => {
            selectedDate = this.getDate();
            return i === selectedDate;
        }).map((x) => {
            return this.props.feeds[x].map((item, idx) => {
                let food;
                if (item.food){
                    food = item.food.map((i,index) => {
                        return <div key={index + i.name}>{i.quantity} {i.name}</div>
                    });
                }
                return <FeedDetail {...this.state} time={item.date} simpleTime={item.simpleTime} key={idx} idx={idx} milk={item.milk} notes={item.notes} dirty={item.nappies.dirty} wet={item.nappies.wet} food={food} fbKey={item.fbKey} nappies={item.nappies} openModal={() => this.openModal(item.fbKey)} clickEditHandler={this.props.clickEditHandler.bind(this)}/>
            })
        })

        let milkTotal = feeds.filter(i => {
            selectedDate = this.getDate();
            return i === selectedDate;
        }).map((x) => {
            return this.props.feeds[x].reduce((a, cv) => {
                return a + cv.milk
            },0)
        })

        let countedNappies = {};

        let totalNappies = feeds.filter(i => {
            selectedDate = this.getDate();
            return i === selectedDate;
        }).map((x) => {
            return this.props.feeds[x].forEach((y) => { 
                return countedNappies[y.nappies] = (countedNappies[y.nappies] || 0) + 1; 
            });
        })

        if(filterByDate.length === 0){
            filterByDate = <h3>There are no feeds recorded for this day <span><i className="fa fa-crying-face" aria-hidden="true"></i></span></h3>
        };

        if (milkTotal.length) {
            milkTotal = <FeedTotal feedTotal={milkTotal} totalWet={countedNappies.wet ? countedNappies.wet : 0} totalDirty={countedNappies.dirty ? countedNappies.dirty : 0}/>
        }

        const removeToggle = this.state.removeToggle ? <span><i className="fa fa-toggle-on fa-1-5x" aria-hidden="true" onClick={this.removeToggleHandler}></i></span> : <span><i className="fa fa-toggle-off fa-1-5x" aria-hidden="true" onClick={this.removeToggleHandler}></i></span>;

        return(
            <Aux>

                <FeedDate month={new Date(this.props.calendarDate).getMonth().toString()} days={new Date(this.props.calendarDate).getDay().toString()} date={new Date(this.props.calendarDate).getDate().toString()} />
                <div className='link-container'>
                    <Link to='/calendar'>
                        <span className='icon'>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            <strong>Calender</strong>
                        </span>
                    </Link>
                    
                <div className='toggleContainer'><span className='edit-text'>Toggle edit:</span> <span className='edit-toggle'>{removeToggle}</span></div>

                </div>
                <div className="feed-details">
                    {milkTotal}
                    {filterByDate}
                    {modal}
                </div>

                <div className='coloumn-container'>
                    <div className='half-coloumn'>
                        <Link to={`/calendar/${this.dateNoSlash(this.props.prevDate)}`}>
                            <Button icon='fa fa-chevron-left prev fl' styleName='half-width' label='Prev' clicked={() => this.props.dateHandler('prev')} />
                        </Link>
                    </div>
                    <div className='half-coloumn'>
                        <Link to={`/calendar/${this.dateNoSlash(this.props.nextDate)}`}>
                            <Button icon='fa fa-chevron-right next fr' styleName='half-width fr' label='Next' clicked={() => this.props.dateHandler('next')} />
                        </Link>
                    </div>
                </div>
            </Aux>
        )
    }
}


export default FeedListSingle;