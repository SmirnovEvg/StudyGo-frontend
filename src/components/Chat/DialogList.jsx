import React from 'react'

export default function DialogList(props) {
const dialogs = props.dialogs.map((item, id) => <div key={id}>{item._id}</div>)
    return (
        <div>
            {dialogs}
        </div>
    )
}
