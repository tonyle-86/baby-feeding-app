import React from 'react';

const feedTotal = (props) => {
    return (
        <div className='feed-total'><i className="fa fa-baby-bottle fa-2x" aria-hidden="true"></i>
            <span className="feed-total-ml"> {props.feedTotal}ml</span>
        </div>
    )
}

export default feedTotal;