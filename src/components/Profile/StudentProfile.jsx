import React from 'react';
import { PropTypes } from 'prop-types';

export default function StudentProfile(props) {
    return (
        <div>
            Student
            <h3>{props.studnumber}</h3>
            <h3>{props.firstName}</h3>
            <h3>{props.secondName}</h3>
            <h3>{props.thirdName}</h3>
            <h3>{props.course}</h3>
            <h3>{props.group}</h3>
            <h3>{props.groupPart}</h3>
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