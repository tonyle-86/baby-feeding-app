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

        let filterByDate = feeds.filter(i => {
            selectedDate = this.getDate();
            return i === selectedDate;
        }).map((x) => {
            return this.props.feeds[x].map((item, idx) => {
                return <FeedDetail time={item.time} key={idx} milk={item.milk} notes={item.notes} />
            })
        })

        return(
            <Aux>
                <h3>{this.props.title}</h3>
                <div className="feed-details">
                {filterByDate}
                </div>

                <Link to={{
                    pathname: '/by-day',
                    search: `?date=${this.props.prevDate.toLocaleDateString().slice(0, 10)}`
                }}>

                    <Button label='Prev' clicked={this.props.prevDateHandler} />

                </Link>


                <Link to={{
                    pathname: '/by-day',
                    search: `?date=${this.props.nextDate.toLocaleDateString().slice(0, 10)}`
                }}>
 
                    <Button label='Next' clicked={this.props.nextDateHandler} />

                </Link>






              
            </Aux>
        )
    }
}

export default FeedListSingle;