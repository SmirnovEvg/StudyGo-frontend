import React from 'react';
import { Link } from 'react-router-dom';
export default function SearchDialogItem(props) {
    return (
        <li key={props.dialog._id}>
            <Link to={`/chat/user/${props.dialog._id}`}>{props.dialog.secondName} {props.dialog.firstName}</Link>
        </li>
    )
}
