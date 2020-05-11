import './WeekTimetable.sass';
import React, { Component } from 'react';
import DayTimetable from './DayTimetable';
import { PropTypes } from 'prop-types';

export default class WeekTimetable extends Component {
    renderDays = () => {
        const { week, teachers, subjects } = this.props;

        return Object.values(week).map((item, index) => (
            <DayTimetable key={index} day={item} weekDay={index} teachers={teachers} subjects={subjects}/>
        ))
    }

    render() {
        return (
            <div className="week">
                {
                    this.renderDays()
                }
            </div>
        )
    }
}

WeekTimetable.propTypes = {
    week: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired
    ])
}