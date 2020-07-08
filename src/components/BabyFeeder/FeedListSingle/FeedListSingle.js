import React, { Component } from 'react';
import FeedDetail from '../FeedItem/FeedDetail';
import Aux from '../../../hoc/Aux/Aux';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import FeedTotal from '../FeedItem/FeedTotal';
import FeedDate from '../FeedItem/FeedDate';


class FeedListSingle extends Component {

    // componentDidMount() {
    //     this.props.componentDidMount();
    // }

    componentDidMount() {
        //this.props.componentDidMount();
    }

    state = {
        removeToggle: false
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
        console.log('formattedDate',formattedDate)
        return new Date(formattedDate).toString().slice(0, 15);
    }

    render() {
        const feeds = Object.keys(this.props.feeds);

        let selectedDate;
        let filterByDate;

        // filterByDate = this.props.test.filter(i => {
        //     selectedDate = this.getDate();
        //     return i[0] === selectedDate;
        // }).map((x) => {
        //     return x[1].map((item, idx) => {
        //         return <FeedDetail time={item.time} key={idx} milk={item.milk} notes={item.notes} />
        //     })
        // })

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
                return <FeedDetail {...this.state} time={item.time} simpleTime={item.simpleTime} key={idx} idx={idx} milk={item.milk} notes={item.notes} dirty={item.nappies.dirty} wet={item.nappies.wet} food={food} fbKey={item.fbKey} click={this.props.removeFeedItemHandler} removeFeedItemHandler={this.removeToggleHandler.bind(this)} clickEditHandler={this.props.clickEditHandler.bind(this)}/>
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

        let totalWet = feeds.filter(i => {
            selectedDate = this.getDate();
            return i === selectedDate;
        }).map((item, idx) => {
            return this.props.feeds[item].reduce((a, cv) => {
                return a + cv.nappies.wet
            }, 0)
        });

        let totalDirty = feeds.filter(i => {
            selectedDate = this.getDate();
            return i === selectedDate;
        }).map((item, idx) => {
            return this.props.feeds[item].reduce((a, cv) => {
                return a + cv.nappies.dirty
            }, 0)
        });

        if(filterByDate.length === 0){
            filterByDate = <h3>There are no feeds recorded for this day <span><i className="fa fa-crying-face" aria-hidden="true"></i></span></h3>
        };

        if (milkTotal.length) {
            milkTotal = <FeedTotal feedTotal={milkTotal} totalWet={totalWet} totalDirty={totalDirty}/>
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
                </div>

                <div className='coloumn-container'>
                    <div className='half-coloumn'>
                        <Link to={`/calendar/${this.dateNoSlash(this.props.prevDate)}`}>
                            <Button icon='fa fa-chevron-left prev fl' styleName='half-width' label='Prev' clicked={this.props.prevDateHandler} />
                        </Link>
                    </div>
                    <div className='half-coloumn'>
                        <Link to={`/calendar/${this.dateNoSlash(this.props.nextDate)}`}>
                            <Button icon='fa fa-chevron-right next fr' styleName='half-width fr' label='Next' clicked={this.props.nextDateHandler} />
                        </Link>
                    </div>
                </div>

            </Aux>
        )
    }
}


export default FeedListSingle;