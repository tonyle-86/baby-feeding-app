import React, { Component } from 'react';
import FeedDetail from '../FeedItem/FeedDetail';

class FeedListSingle extends Component {

    getDate = () => {
        let params = (new URL(document.location)).searchParams;
        let date = params.get('date');
        
        const formattedDate = `${date.slice(3, 5)}/${date.slice(0, 2)}/${date.slice(6, 10)}`
        return new Date(formattedDate).toString().slice(0, 15);
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

        <div>{filterByDate}</div>
           
        )
    }
}

export default FeedListSingle;