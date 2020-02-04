import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
export default function DialogItem(props) {
    return (
        <li key={props.dialog.id}>
            <Link to={`/chat/${props.dialog.id}`}>{props.dialog.user.secondName} {props.dialog.user.firstName}</Link>
        </li>
    )
}

DialogItem.propTypes = {
    dialog: PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            secondName: PropTypes.string.isRequired
        })
    })
}