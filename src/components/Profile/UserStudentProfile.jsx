import React from 'react';
import { PropTypes } from 'prop-types';

export default function UserStudentProfile(props) {
    console.log(typeof (props.course));
    console.log(typeof (props.group));
    return (
        <div>
            Student
            <p>{props.firstName}</p>
            <p>{props.secondName}</p>
            <p>{props.thirdName}</p>
            <p>{props.course}</p>
            <p>{props.group}</p>
        </div>
    )
}

UserStudentProfile.propTypes = {
    firstName: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    secondName: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    thirdName: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    course: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    group: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ])
}