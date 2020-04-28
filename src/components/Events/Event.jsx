import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeEvent, updateEvent } from '../../actions';

export default function Event(props) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [eventName, setEventName] = useState(props.event.name);
    const [eventDescription, setEventDescription] = useState(props.event.description);
    const deleteEvent = (id) => {
        axios.delete('http://localhost:3333/api/event', {
            data: {
                id
            }
        })
        dispatch(removeEvent(id))
    }
    const editForm = () => {
        setIsEdit(!isEdit)
    }
    const editEvent = () => {
        axios.put('http://localhost:3333/api/event', {
            eventId: props.event._id,
            name: eventName,
            description: eventDescription,
        })
        .then(res => {
            dispatch(updateEvent(res.data))
            setIsEdit(!isEdit)
        })
    }
    const changeName = e => {
        setEventName(e.target.value);
    }
    const changeDescription = e => {
        setEventDescription(e.target.value)
    }
    return (
        <div>
            {isEdit ? (
                <>
                    <input type="text" defaultValue={eventName}  onChange={changeName}/>
                    <input type="text" defaultValue={eventDescription}  onChange={changeDescription}/>
                    <button onClick={editEvent}>edit</button>
                    <button onClick={editForm}>close</button>
                </>
            ) : (
                    <>
                        <p>{props.event.name}</p>
                        <p>{props.event.description}</p>
                        <button onClick={editForm}>edit</button>
                        <button onClick={() => deleteEvent(props.event._id)}>remove</button>
                    </>
                )}
        </div>
    )
}
