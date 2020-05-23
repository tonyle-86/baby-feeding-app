import React, { Component } from 'react';
import './FeedDetail.scss';

class FeedDetail extends Component {

    state = {
        feeds: this.props.feedState
    }

    render() {
        return (
            <div className="feed-item">
                <div className="feed-time">{new Date(this.props.time).toLocaleTimeString().slice(0,5)}</div>
                <div className="feed-amount">{this.props.milk}ml of milk, {this.props.food}</div>
                {this.props.notes ? <p><strong>Notes:</strong> {this.props.notes}</p> : null}
            </div>
        )
    }
}

export default FeedDetail