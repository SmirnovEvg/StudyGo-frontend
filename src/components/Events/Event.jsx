import React from 'react';
import styles from './Event.module.sass';
import { Link } from 'react-router-dom';
import Button from "../Inputs/Button/Button";

const month = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
]


export default function Event(props) {
    const eventCreateDate = new Date(props.event.dateCreated).getMonth()

    return (
        <div className={styles.eventBlock}>
            <div className={styles.eventDate}>
                <div className={styles.eventDateMonth}>
                    {month[eventCreateDate]}
                </div>
                <div className={styles.eventDateDay}>
                    {new Date(props.event.dateCreated).getDate()}
                </div>
            </div>
            <div className={styles.eventImage} style={{ background: `url(/uploads/${props.event.image}) no-repeat center center / cover` }}></div>
            <div className={styles.eventInfo}>
                <h3>{props.event.name}</h3>
                <p>{props.event.description}</p>
                <Button variant="contained" color="primary" component={Link} to={`/events/${props.event._id}`}>
                    Подробнее
                </Button>
            </div>
        </div>
    )
}
