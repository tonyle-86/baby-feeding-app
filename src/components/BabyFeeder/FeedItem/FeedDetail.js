import React, { Component } from 'react';
import './FeedDetail.scss';

class FeedDetail extends Component {

    state = {
        feeds: this.props.feedState
    }

    render() {
        return (
            <div className="feed-item">
                <div className="feed-time-container">
                    <div className="feed-time">{new Date(this.props.time).toLocaleTimeString().slice(0,5)}</div>
                </div>
                <div className="feed-amount">
                                    
                    
                    {this.props.milk ? <p><strong>Milk:</strong> {this.props.milk}ml</p> : null}
                    {this.props.food ? <p><strong>Food:</strong> {this.props.food}</p> : null}
                    {this.props.notes ? <p><strong>Notes:</strong> {this.props.notes}</p> : null}
                </div>

                
            </div>
        )
    }
}

export default FeedDetail