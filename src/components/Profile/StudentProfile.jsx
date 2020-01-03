import React from 'react'

export default function StudentProfile(props) {
    return (
        <div>
            Student
            <p>{props.studnumber}</p>
            <p>{props.firstName}</p>
        </div>
    )
}
