import React from 'react';
import LessonTimetable from './LessonTimetable';

export default function DayTimetable(props) {
    const weekDays = {
        1: "Понедельник",
        2: "Вторник",
        3: "Среда",
        4: "Четверг",
        5: "Пятница",
        6: "Суббота"
      };
    return (
        <div>
            <p key={props.weekDay}>{weekDays[props.weekDay + 1]}</p>
            {props.day.length ? props.day.map((item) => <LessonTimetable lesson={item}/>) : "нет пар"}
        </div>
    )
}
