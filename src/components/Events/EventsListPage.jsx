import React, { useEffect, useState } from 'react';
import styles from './EventsListPage.module.sass'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Event from './Event';
import AddEvent from './AddEvent';
import { setEvents } from '../../actions';
import userIsAuthenticatedRedirect from '../wrappers/userIsAuthenticatedRedirect';
import AuthService from '../../services/AuthService';
import Pagination from '@material-ui/lab/Pagination';

const EventsListPage = (props) => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.events);
    const user = AuthService.getUser();
    const [page, setPage] = React.useState(1);
    const [eventsListOnPage, setEventsListOnPage] = useState([]);
    const eventOnPageCount = 5;

    useEffect(() => {
        axios.get('http://localhost:3333/api/event')
            .then(res => {
                dispatch(setEvents(res.data))
            })
            setEventsListOnPage(events.slice(page * eventOnPageCount - eventOnPageCount, page * eventOnPageCount))
        }, [dispatch, events, page]);
        
    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div>
            {user.role === 2 && <AddEvent />}
            {eventsListOnPage.map((event, index) => {
                return (
                    <>
                        {!!index && <div className={styles.eventLine}></div>}
                        <Event key={index} event={event} />
                    </>
                )
            })}
            <div className={styles.pagination}>
                <Pagination count={Math.ceil(events.length / eventOnPageCount)} page={page} onChange={handleChange} />
            </div>
        </div>
    )
}

export default userIsAuthenticatedRedirect(EventsListPage)