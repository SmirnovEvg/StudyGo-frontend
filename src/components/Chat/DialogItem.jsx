import React from 'react';
import { Link } from 'react-router-dom';
export default function DialogItem(props) {
    return (
        <li key={props.dialog.id}>
            <Link to={`/chat/${props.dialog.id}`}>{props.dialog.user.secondName} {props.dialog.user.firstName}</Link>
        </li>
    )
}
