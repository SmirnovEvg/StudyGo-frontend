import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Event from './Event';
import AddEvent from './AddEvent';
import { setEvents } from '../../actions';
import userIsAuthenticatedRedirect from '../wrappers/userIsAuthenticatedRedirect';

const EventsPage = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.events)

    useEffect(() => {
        axios.get('http://localhost:3333/api/event')
        .then(res => {
            dispatch(setEvents(res.data))
        })
    }, [dispatch])
    
    return (
        <div>
            <AddEvent/>
            {events.map((event, index) => {
                return <Event key={index} event={event}/>
            })}
        </div>
    )
}

export default userIsAuthenticatedRedirect(EventsPage)