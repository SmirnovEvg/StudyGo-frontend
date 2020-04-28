import React from 'react';
import { PropTypes } from 'prop-types';

export default function UserStudentProfile(props) {
    return (
        <div>
            Student
            <h3>{props.firstName}</h3>
            <h3>{props.secondName}</h3>
            <h3>{props.thirdName}</h3>
            <h3>{props.course}</h3>
            <h3>{props.group}</h3>
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