import React from 'react'

export default function TeachertProfile(props) {
    return (
        <div>
            Teacher
            <p>{props.studnumber}</p>
            <p>{props.firstName}</p>
        </div>
    )
}
