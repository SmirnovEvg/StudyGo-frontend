import React from 'react';
import { PropTypes } from 'prop-types';

export default function UserTeachertProfile(props) {
    return (
        <div>
            Teacher
            <p>{props.firstName}</p>
            <p>{props.secondName}</p>
            <p>{props.thirdName}</p>
            <p>{props.department}</p>
            <p>{props.rank}</p>
        </div>
    )
}

UserTeachertProfile.propTypes = {
    firstName: PropTypes.string.isRequired,
    secondName: PropTypes.string.isRequired,
    thirdName: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired
}