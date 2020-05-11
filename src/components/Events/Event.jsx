import React from 'react';
import { Link } from 'react-router-dom';

export default function Event(props) {
    return (
        <div>
            <Link to={`/events/${props.event._id}`}>{props.event.name} {props.event.description}</Link>
        </div>
    )
}
