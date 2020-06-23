import React, { Component } from 'react';
// import '../FeedDate.scss';

class FeedDate extends Component {

    render() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const nth = (d) => {
            if (d > 3 && d < 21) return 'th';
            switch (d % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        }

        return (
            <h3 className="feed-date">{days[this.props.days]} {this.props.date}{nth(this.props.date)} {months[this.props.month]}</h3>
        )
    }
}

export default FeedDate