import React from 'react'

export default function TeachertProfile(props) {
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
