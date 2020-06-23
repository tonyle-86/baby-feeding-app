import React from 'react';

const feedTotal = (props) => {
    return (
        <h3 className='feed-total'>Total milk: 
            <span className="feed-total-ml"> {props.feedTotal}ml</span>
        </h3>
    )
}

export default feedTotal;