import React from 'react';
import styles from './Event.module.sass'
import { Link } from 'react-router-dom';
import Button from "../Inputs/Button/Button";
import Paper from "@material-ui/core/Paper";

const Event = ({ event }) => {
    return (
        <Paper elevation={3} className={styles.eventBlock}>
            <div className={styles.eventImage} style={{ background: `url(/uploads/${event.image}) no-repeat center center / cover` }}></div>
            <div className={styles.eventInfo}>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <Button variant="contained" color="primary" component={Link} to={`/events/${event._id}`}>
                    Подробнее
                </Button>
            </div>
        </Paper>
    )
}

export default Event;