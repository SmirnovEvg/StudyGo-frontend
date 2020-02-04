import React from 'react';
import { PropTypes } from 'prop-types';

export default function TeachertProfile(props) {
    console.log(typeof (props.studnumber));
    console.log(typeof (props.course));
    console.log(typeof (props.group));
    return (
        <div>
            Teacher
            <p>{props.studnumber}</p>
            <p>{props.firstName}</p>
            <p>{props.secondName}</p>
            <p>{props.thirdName}</p>
            <p>{props.department}</p>
            <p>{props.rank}</p>
        </div>
    )
}

TeachertProfile.propTypes = {
    studnumber: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    firstName: PropTypes.string.isRequired,
    secondName: PropTypes.string.isRequired,
    thirdName: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired
}