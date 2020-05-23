import React from 'react';
import styles from './DayTimetable.module.sass'
import LessonTimetable from './LessonTimetable';
import { PropTypes } from 'prop-types';
import Paper from "@material-ui/core/Paper";

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
        <div className={styles.day}>
            <h3 key={weekDay}>{weekDays[weekDay + 1]}</h3>
            <div className={styles.lessonsList}>
                {day.length ? day.map((item, index) => 
                <LessonTimetable key={index} lesson={item} teachers={teachers} subjects={subjects}/>
                ) : (
                <Paper 
                    elevation={3} 
                    className={styles.lesson}
                    style={{color: '#666'}}
                >
                    Занятий нет
                </Paper>
                )
                }
            </div>
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
