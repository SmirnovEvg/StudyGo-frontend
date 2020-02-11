import React, { Component } from 'react';
import DayTimetable from './DayTimetable';
// import { PropTypes } from 'prop-types';

export default class WeekTimetable extends Component {
    renderDays = () => {
        return Object.values(this.props.week).map((item, index) => (
            <DayTimetable day={item} weekDay={index} />
        ))
    }

    render() {
        return (
            <div>
                {
                    this.renderDays()
                }
            </div>
        )
    }
}

WeekTimetable.propTypes = {

}