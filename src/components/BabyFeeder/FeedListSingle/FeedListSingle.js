import React, { Component } from 'react';
import FeedDetail from '../FeedItem/FeedDetail';
import Aux from '../../../hoc/Aux/Aux';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';

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

    nextDate = () => {
        let myDate = new Date(this.props.calendarDate);
        myDate.setDate(myDate.getDate() + 1);

        // this.setState({
        //     nextDate: myDate.toLocaleDateString().slice(0, 10)
        // }) 
    }

    render() {

        const feeds = Object.keys(this.props.feeds);

        let selectedDate;
        let filterByDate;

        filterByDate = feeds.filter(i => {
            selectedDate = this.getDate();
            return i === selectedDate;
        }).map((x) => {
            return this.props.feeds[x].map((item, idx) => {
                return <FeedDetail time={item.time} key={idx} milk={item.milk} notes={item.notes} />
            })
        })

        // let getMilkTotal = feeds.map((item, idx) => {
        //     return this.props.feeds[item].reduce((a, cv) => {
        //         return a + cv.milk
        //     }, 0)
        // });

        // console.log(getMilkTotal)

        if(filterByDate.length === 0){
            filterByDate = <h3>There are no feeds recorded for this day :(</h3>
        };

        return(
            <Aux>
                <h3 className='inline-block'>{this.props.title}</h3>
                <Link to='/calendar'>
                    <span className='icon fr'>
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        <strong>Back to calender</strong>
                    </span>
                </Link>
                <div className="feed-details">
                    {filterByDate}
                </div>

                <div className='food-section'>
                    <div className='half-coloumn'>
                        <Link to={{
                            pathname: '/by-day',
                            search: `?date=${this.props.prevDate.toLocaleDateString().slice(0, 10)}`}}>
                            <Button icon='fa fa-chevron-left fl' styleName='half-width' label='Prev' clicked={this.props.prevDateHandler} />
                        </Link>
                    </div>
                    <div className='half-coloumn'>
                        <Link to={{
                            pathname: '/by-day',
                            search: `?date=${this.props.nextDate.toLocaleDateString().slice(0, 10)}`}}>
                            <Button icon='fa fa-chevron-right fr' styleName='half-width fr' label='Next' clicked={this.props.nextDateHandler} />
                        </Link>
                    </div>
                </div>

            </Aux>
        )
    }
}

export default FeedListSingle;