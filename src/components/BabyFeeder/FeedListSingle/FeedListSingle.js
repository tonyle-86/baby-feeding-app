import React, { Component } from 'react';
import FeedDetail from '../FeedItem/FeedDetail';
import Aux from '../../../hoc/Aux/Aux';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import FeedTotal from '../FeedItem/FeedTotal';
import FeedDate from '../FeedItem/FeedDate';

class FeedListSingle extends Component {

    componentDidMount() {
        this.props.componentDidMount();
    }

    getDate = () => {
        let params = (new URL(document.location)).searchParams;
        let date = params.get('date');
        
        const formattedDate = `${date.slice(3, 5)}/${date.slice(0, 2)}/${date.slice(6, 10)}`
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
                return <FeedDetail time={item.time} key={idx} milk={item.milk} notes={item.notes} dirty={item.nappies.dirty} wet={item.nappies.wet}/>
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

        return(
            <Aux>
                <FeedDate month={new Date(this.props.calendarDate).getMonth().toString()} days={new Date(this.props.calendarDate).getDay().toString()} date={new Date(this.props.calendarDate).getDate().toString()} />
                <div className='link-container'>
                    <Link to='/calendar'>
                        <span className='icon'>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            <strong>Back to calender <i className="fa fa-calendar fa-1x" aria-hidden="true"></i></strong>
                        </span>
                    </Link>
                </div>
                <div className="feed-details">
                    {milkTotal}
                    {filterByDate}
                </div>

                <div className='coloumn-container'>
                    <div className='half-coloumn'>
                        <Link to={{
                            pathname: '/by-day',
                            search: `?date=${this.props.prevDate.toLocaleDateString().slice(0, 10)}`}}>
                            <Button icon='fa fa-chevron-left prev fl' styleName='half-width' label='Prev' clicked={this.props.prevDateHandler} />
                        </Link>
                    </div>
                    <div className='half-coloumn'>
                        <Link to={{
                            pathname: '/by-day',
                            search: `?date=${this.props.nextDate.toLocaleDateString().slice(0, 10)}`}}>
                            <Button icon='fa fa-chevron-right next fr' styleName='half-width fr' label='Next' clicked={this.props.nextDateHandler} />
                        </Link>
                    </div>
                </div>

            </Aux>
        )
    }
}

export default FeedListSingle;