import React from 'react';
import { PropTypes } from 'prop-types';

export default function StudentProfile(props) {
    return (
        <div>
            Student
            <p>{props.studnumber}</p>
            <p>{props.firstName}</p>
            <p>{props.secondName}</p>
            <p>{props.thirdName}</p>
            <p>{props.course}</p>
            <p>{props.group}</p>
            <p>{props.groupPart}</p>
        </div>
    )
}

StudentProfile.propTypes = {
    studnumber: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
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
    ]),
    groupPart: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
}