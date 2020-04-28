import React from 'react';
import { PropTypes } from 'prop-types';

export default function UserTeachertProfile(props) {
    console.log(props.additionals);
    
    return (
        <div>
            Teacher
            <h3>{props.firstName}</h3>
            <h3>{props.secondName}</h3>
            <h3>{props.thirdName}</h3>
            <h3>{props.department}</h3>
            <h3>{props.rank}</h3>
            <h3>Допы</h3>
            {props.additionals && props.additionals.map((item, index) => {
                return <div key={index}>
                    {item.subject}
                    <br />
                    {item.groups.map((group, index) => {
                        return <span key={index}>{group} </span>
                    })}
                </div>
            })}
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