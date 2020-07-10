import React, { Component } from 'react';
import FeedDateItem from '../FeedItem/FeedDateItem';
import FeedDetail from '../FeedItem/FeedDetail';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class FeedsList extends Component {

    // componentDidMount(){
    //     this.props.componentDidMount();
    // }

    dailyTotalOf = (type) => {
       return this.props.feedsArr.map((item, idx) => {
            return item[1].reduce((a, cv) => {
                if(type === 'milk'){
                    return a + cv.milk
                } else if (type === 'wet') {
                    return a + cv.nappies.wet
                } else if (type === 'dirty') {
                    return a + cv.nappies.dirty
                } 
                
                return null

            }, 0)
        });
    }

    render() {
        //let feeds = Object.keys(this.props.feeds);
        // let getMilkTotal = feeds.map((item,idx) => {
        //     return this.props.feeds[item].reduce((a,cv) => {
        //         return a + cv.milk
        //     },0)
        // });

        let groupDates;

        let nappies = Object.fromEntries(Object
            .entries(this.props.feeds)
            .map(([key, values]) => [
                key,
                values.reduce((r, { nappies }) => {
                    r[nappies] = (r[nappies] || 0) + 1;
                    return r;
                }, {})
            ])
        );
    
        const nappyKey = Object.keys(nappies);

        let wetNappies = nappyKey.map((item,idx) => {
            if (nappies[item].wet === undefined) {
                return 0
            } else {
                return nappies[item].wet
            }
        })

        let dirtyNappies = nappyKey.map((item, idx) => {
            if (nappies[item].dirty === undefined) {
                return 0
            } else {
                return nappies[item].dirty
            }
        })

        let loadMore = null;

        if (this.props.noOfResultsToShow < this.props.feedsLength) {
            loadMore = <Button styleName='width-100' label='Load more' clicked={this.props.loadMore} />
        }
        
        if(this.props.feeds.length === 0){
            groupDates = <h3>There are currently no feeds</h3>
        } else {      
            // groupDates = feeds.map((item, idx) => {
            //     console.log(this.props.feeds[item]);
            //     return <FeedDateItem key={idx} date={item} total={getMilkTotal[idx]}>
            //         {this.props.feeds[item].map(x => {
            //         let foodEatenAtTime;
            //         if (x.food) {
            //             foodEatenAtTime = x.food.map((item, idx) => {
            //                 return <div key={idx}>{item.quantity} {item.name}</div>;
            //             })
            //         }

            //         return <FeedDetail food={x.food ? foodEatenAtTime : null} key={x.time + x.milk + getMilkTotal[idx]} milk={x.milk} time={x.time} notes={x.notes} />
            //     })}</FeedDateItem>
            // })





                








            groupDates = this.props.feedsArr.map((item,idx) => {
                return <FeedDateItem key={idx} date={item[1][0].date} total={this.dailyTotalOf('milk')[idx]} totalWet={wetNappies[idx]} totalDirty={dirtyNappies[idx]}>
                    {item[1].map((x,idx) => {

                    let foodEatenAtTime;
                    if (x.food) {
                        foodEatenAtTime = x.food.map((item, idx) => {
                            return <div key={idx}>{item.quantity} {item.name}</div>;
                        })
                    }

                        return <FeedDetail food={x.food ? foodEatenAtTime : null} key={x.time + x.milk + this.dailyTotalOf('milk')[idx]} milk={x.milk} time={x.date} notes={x.notes} nappies={x.nappies}/>
                })}
                </FeedDateItem>
            })
        }

        return (
            <Aux>
                <h2>{this.props.label}</h2>
                {groupDates}
                {loadMore}
            </Aux>
        )
    }
} 

export default FeedsList;