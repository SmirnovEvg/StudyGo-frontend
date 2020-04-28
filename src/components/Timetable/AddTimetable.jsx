import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../actions';
import TextField from "@material-ui/core/TextField";
import Button from "../Inputs/Button/Button";

export default function AddTimetable() {
    const dispatch = useDispatch();
    const [classroomNumber, setClassroomNumber] = useState('');
    const [hall, setHall] = useState('');
    const [week, setWeek] = useState('');
    const [dayOfTheWeek, setDayOfTheWeek] = useState('');
    const [classTime, setClassTimel] = useState('');
    const [type, setType] = useState('');
    const [group, setGroup] = useState('');
    const [course, setCourse] = useState('');
    const [groupPart, setgroupPart] = useState('');
    const changeClassroomNumber = e => {
        setClassroomNumber(e.target.value);
    }
    const changeHall = e => {
        setHall(e.target.value)
    }
    const changeWeek = e => {
        setWeek(e.target.value)
    }
    const changeDayOfTheWeek = e => {
        setDayOfTheWeek(e.target.value)
    }
    const changeClassTime = e => {
        setClassTimel(e.target.value)
    }
    const changeType = e => {
        setType(e.target.value)
    }
    const changeGroup = e => {
        setGroup(e.target.value)
    }
    const changeCourse = e => {
        setCourse(e.target.value)
    }
    const changeGroupPart = e => {
        setgroupPart(e.target.value)
    }
    const addEvent = () => {
        axios.post('http://localhost:3333/api/timetable', {
            teacher: '5e1f0a1e62169906f80b8cd8',
            subject: '5e3ad45fedf8c52e680a0a88',
            classroomNumber: classroomNumber,
            hall: hall,
            week: week,
            dayOfTheWeek: dayOfTheWeek,
            classTime: classTime,
            type: type,
            group: group,
            course: course,
            groupPart: groupPart,
        })
        .then(res => {
            console.log(res);
        })
    }
    return (
        <div>
            <TextField
                id="standard-name"
                label="Аудитория"
                value={classroomNumber}
                onChange={changeClassroomNumber}
                margin="normal"
            />
            <TextField
                id="standard-name"
                label="Корпус"
                value={hall}
                onChange={changeHall}
                margin="normal"
            />
            <TextField
                id="standard-name"
                label="Неделя"
                value={week}
                onChange={changeWeek}
                margin="normal"
            />
            <TextField
                id="standard-name"
                label="День недели"
                value={dayOfTheWeek}
                onChange={changeDayOfTheWeek}
                margin="normal"
            />
            <TextField
                id="standard-name"
                label="Номер пары"
                value={classTime}
                onChange={changeClassTime}
                margin="normal"
            />
            <TextField
                id="standard-name"
                label="Тип занятия"
                value={type}
                onChange={changeType}
                margin="normal"
            />
            <TextField
                id="standard-name"
                label="Группа"
                value={group}
                onChange={changeGroup}
                margin="normal"
            />
            <TextField
                id="standard-name"
                label="Курс"
                value={course}
                onChange={changeCourse}
                margin="normal"
            />
            <TextField
                id="standard-name"
                label="Подгруппа"
                value={groupPart}
                onChange={changeGroupPart}
                margin="normal"
            />
            <Button
                variant="contained"
                color="secondary"
                onClick={() => addEvent()}
            >
                Добавить расписание
        </Button>
        </div>
    )
}
