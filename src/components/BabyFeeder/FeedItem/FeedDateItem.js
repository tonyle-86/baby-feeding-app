import React from 'react';
import FeedTotal from './FeedTotal';
import FeedDate from './FeedDate';

const feedDateItem = (props) => {
        return (
            <div className='group-feed'>
                <FeedDate days={new Date(props.date).getDay()} date={new Date(props.date).getDate()} month={new Date(props.date).getMonth()}/>
                <div className="feed-details">
                    <FeedTotal feedTotal={props.total} totalWet={props.totalWet} totalDirty={props.totalDirty}/>
                    
                    {props.children}
                </div>    
            </div>   
        )
    }

export default feedDateItem