import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export default function SearchDialogItem(props) {
    return (
        <li key={props.dialog._id}>
            <Link to={`/chat/user/${props.dialog._id}`}>{props.dialog.secondName} {props.dialog.firstName}</Link>
        </li>
    )
}

SearchDialogItem.propTypes = {
    dialog: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        secondName: PropTypes.string.isRequired,
    })
}
