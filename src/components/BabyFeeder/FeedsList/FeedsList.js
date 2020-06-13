import React, { Component } from 'react';
import FeedDate from '../FeedItem/FeedDate';
import FeedDetail from '../FeedItem/FeedDetail';
import Aux from '../../../hoc/Aux/Aux';

class FeedsList extends Component {

    componentDidMount(){
        this.props.componentDidMount();
    }

    render() {

        let feeds = Object.keys(this.props.feeds);

        let getMilkTotal = feeds.map((item,idx) => {
            return this.props.feeds[item].reduce((a,cv) => {
                return a + cv.milk
            },0)
        });

        let groupDates;

        if(this.props.feeds.length === 0){
            groupDates = <h1>There are currently no feeds</h1>
        } else {      
            groupDates = feeds.map((item, idx) => {
                return <FeedDate key={idx} date={item} total={getMilkTotal[idx]}>{this.props.feeds[item].map(x => {
                    let foodEatenAtTime;
                    if (x.food) {
                        foodEatenAtTime = x.food.map((item, idx) => {
                            return <div key={idx}>{item.quantity} {item.name}</div>;
                        })
                    }

                    return <FeedDetail food={x.food ? foodEatenAtTime : null} key={x.time + x.milk + getMilkTotal[idx]} milk={x.milk} time={x.time} notes={x.notes} />
                })}</FeedDate>
            })
        }

        return (
            <Aux>
                {groupDates}
            </Aux>
        )
    }
} 

export default FeedsList;