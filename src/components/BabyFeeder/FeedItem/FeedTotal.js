import React from 'react';

const feedTotal = (props) => {
    return (
        <div className='feed-total'>
            <i className="fa fa-nappy-wet fa-1-5x" aria-hidden="true"></i> {props.totalWet} | <i className="fa fa-nappy-dirty fa-1-5x" aria-hidden="true"></i> {props.totalDirty} | <i className="fa fa-baby-bottle fa-1-5x" aria-hidden="true"></i>
            <span className="feed-total-ml"> {props.feedTotal}ml</span>
        </div>
    )
}

export default feedTotal;