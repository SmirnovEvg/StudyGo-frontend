import React from 'react'

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
        </div>
    )
}
