import './Main.sass';
import React from 'react';

const Main = (props) => {
    return (
        <div>
            <header><ul>
                <li><a href="/">Главная</a></li>
                <li><a href="/chat">Диалоги</a></li>
                <li><a href="/laboratory">Лабораторные работы</a></li>
                <li><a href="/events">Новости</a></li>
                <li><a href="/timetable">Расписание</a></li>
                <li><a href="/profile">Профиль</a></li>
            </ul></header>
            {props.children}
        </div>
    )
}

export default Main;