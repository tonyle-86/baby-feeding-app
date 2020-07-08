import React, { Component } from 'react';
import './FeedDetail.scss';
import { Route, Link } from 'react-router-dom';

class FeedDetail extends Component {

    state = {
        removeToggle: this.props.removeToggle
    }

    render() {

        const deleteButton = this.props.removeToggle ? <i className="fa fa-trash fa-1-5x" aria-hidden="true" onClick={() => this.props.click(this.props.fbKey, this.props.idx)}></i> : null;

        const editButton = this.props.removeToggle ? <Link to={{ pathname: '/edit' }}><i className="fa fa-pencil fa-1-5x" aria-hidden="true" onClick={() => this.props.clickEditHandler(this.props.fbKey, this.props.simpleTime)}></i> </Link>: null;
        

        return (
           
            <div className="feed-item"> 
                <Route path='/calendar'>
                    
                    <div className='modify-buttons'>
                        {deleteButton}
                        {editButton}
                    </div>


                </Route>
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
                    <div className="full-coloumn">
                        <div>
                            <strong>Nappy</strong><br /> {this.props.nappies}
                        </div>
                    </div>
                    <div className="full-coloumn">{this.props.notes ? <div><strong>Notes</strong><br /> {this.props.notes}</div> : null}</div>
                </div>

                
            </div>
        )
    }
}

export default FeedDetail