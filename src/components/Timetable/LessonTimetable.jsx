import React from 'react';
import { PropTypes } from 'prop-types';

export default function LessonTimetable({ lesson }) {
    return (
        <div>
            <p>{lesson._id}</p>
            {`${lesson.teacher.secondName} ${lesson.teacher.firstName[0]}. ${lesson.teacher.thirdName[0]}.`}
            <br />
            {`${lesson.subject.name}`}
        </div>
    )
}

LessonTimetable.propTypes = {
    lesson: PropTypes.object.isRequired
}
