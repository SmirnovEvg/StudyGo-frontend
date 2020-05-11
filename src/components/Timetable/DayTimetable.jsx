import './DayTimetable.sass';
import React from 'react';
import LessonTimetable from './LessonTimetable';
import { PropTypes } from 'prop-types';

export default function DayTimetable(props) {
    const weekDays = {
        1: "Понедельник",
        2: "Вторник",
        3: "Среда",
        4: "Четверг",
        5: "Пятница",
        6: "Суббота"
    };
    const { weekDay, day, teachers, subjects } = props;
    
    return (
        <div className="week-day">
            <p key={weekDay}>{weekDays[weekDay + 1]}</p>
            {day.length ? day.map((item, index) => <LessonTimetable key={index} lesson={item} teachers={teachers} subjects={subjects}/>) : "нет пар"}
        </div>
    )
}

DayTimetable.propTypes = {
    weekDay: PropTypes.number.isRequired,
    day: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.object.isRequired
    ])
}
