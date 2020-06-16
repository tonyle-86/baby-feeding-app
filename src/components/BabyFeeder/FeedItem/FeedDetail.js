import React, { Component } from 'react';
import './FeedDetail.scss';

class FeedDetail extends Component {

    state = {
        feeds: this.props.feedState
    }

    render() {
        return (
            <div className="feed-item">
                <h1>{this.props.test}</h1>
                <div className="feed-time-container">
                    <div className="feed-time">{new Date(this.props.time).toLocaleTimeString().slice(0,5)}</div>
                </div>
                <div className="feed-amount">
                                    
                    <div className="half-coloumn">
                        <div>
                            <strong>Milk</strong><br />{this.props.milk ? this.props.milk + 'ml' : 'None'}
                        </div>
                    </div>
                    <div className="half-coloumn">
                        <div>
                            <strong>Food</strong><br /> {this.props.food ? this.props.food : 'None'}
                        </div>
                    </div>
                    <div className="full-coloumn">{this.props.notes ? <div><strong>Notes</strong><br /> {this.props.notes}</div> : null}</div>
                </div>

                
            </div>
        )
    }
}

export default FeedDetail