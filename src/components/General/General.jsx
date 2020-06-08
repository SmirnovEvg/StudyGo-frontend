import React, { useEffect, useState } from 'react';
import TimetableService from "../../services/TimetableService";
import AuthService from "../../services/AuthService";
import axios from "axios";
import Lesson from './Lesson';
import Event from './Event';
import styles from './General.module.sass';
import userIsAuthenticatedRedirect from "../wrappers/userIsAuthenticatedRedirect";
import dateFormat from 'dateformat';


const General = () => {
    dateFormat.i18n = {
        dayNames: [
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
            'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
        ],
        monthNames: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ],
        timeNames: [
            'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
        ]
    };
    const [lessons, setLessons] = useState([]);
    const [news, setNews] = useState([]);
    const [user, setUser] = useState({});
    const dateNow = new Date(Date.now()).getDay();
    const weekNow = TimetableService.getWeekNumber().toString();

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = AuthService.getToken();

                const res = await axios.get("http://localhost:3333/api/user", {
                    headers: {
                        Authorization: token,
                    },
                })

                setUser(res.data)

                if (!res.data.userId.role) {
                    const timetable = await axios.get("http://localhost:3333/api/timetable/day", {
                        params: {
                            course: res.data.course,
                            group: res.data.group,
                            groupPart: res.data.groupPart,
                            dayOfTheWeek: dateNow,
                            week: weekNow,
                        },
                    });
                    setLessons(timetable.data)

                } else {
                    const timetable = await axios.get("http://localhost:3333/api/timetable/day/teacher", {
                        params: {
                            teacher: res.data.userId._id,
                            dayOfTheWeek: dateNow,
                            week: weekNow,
                        },
                    });
                    setLessons(timetable.data)
                }

                const events = await axios.get('http://localhost:3333/api/event');
                console.log(events);

                setNews(events.data.slice(0, 3))
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [dateNow, weekNow]);
    return (
        <div className={styles.generalPage}>

            <h2>{dateFormat(new Date(), "fullDate")}</h2>
            <div className={styles.timetableContainer}>
                {lessons.map((lesson) => {
                    return (
                        <Lesson lesson={lesson} user={user} key={lesson._id} />
                    )
                })}
            </div>
            <h2>Последние события</h2>
            <div className={styles.newsContainer}>
                {news.map((event) => {
                    return (
                        <Event event={event} />
                    )
                })}
            </div>
        </div>
    )
}

export default userIsAuthenticatedRedirect(General);