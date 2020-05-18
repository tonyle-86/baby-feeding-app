import React, { Component } from 'react';
import './FeedDetail.scss';

class FeedDetail extends Component {

    state = {
        feeds: this.props.feedState
    }

    render() {
        return (
            <div className="feed-detail">
                <p>{this.props.time.slice(0,5)} - {this.props.amount}ml</p>
                {this.props.notes ? <p><strong>Notes:</strong> {this.props.notes}</p> : null}
            </div>
        )
    }
}

export default FeedDetail