import React, { useState } from "react";
import axios from 'axios';

import AuthService from "../../services/AuthService";

import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import Button from "../Inputs/Button/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import { useDispatch } from 'react-redux';
import { switchFormDisplay, addAdditional } from '../../actions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function AddAdditionalForm({ subjects }) {
    const dispatch = useDispatch();

    const classes = useStyles();
    const [subject, setSubject] = useState("");
    const [classroomNumber, setClassroomNumber] = useState("");
    const [hall, setHall] = useState("");
    const [dayOfTheWeek, setDayOfTheWeek] = useState("");
    const [classTime, setClassTime] = useState("");
    const [groups, setGroup] = useState([]);
    const [groupValue, setGroupValue] = useState("");

    const handleDelete = (chipToDelete) => async () => {
        setGroup((chips) => chips.filter((chip) => chip !== chipToDelete));
    };

    const changeGroupValue = e => {
        if (e.target.value <= 10 && e.target.value >= 0) {
            setGroupValue(e.target.value)
            console.log(typeof (+e.target.value));
        }
    }

    const handleChange = (name) => (event) => {
        switch (name) {
            case "subject":
                setSubject(event.target.value);
                break;
            case "classroomNumber":
                setClassroomNumber(event.target.value);
                break;
            case "hall":
                setHall(event.target.value);
                break;
            case "dayOfTheWeek":
                setDayOfTheWeek(event.target.value);
                break;
            case "classTime":
                setClassTime(event.target.value);
                break;
            default:
                break;
        }
    };

    const addGroup = () => {
        if(!groups.includes(+groupValue)){
            setGroup(groups.concat(+groupValue));
            setGroupValue('');
        }else {
            setGroupValue('');
        }
    }

    const createNewAdditional = async () => {
        if(groups.length){
            await axios.post('http://localhost:3333/api/additional', {
                teacher: AuthService.getUser()._id,
                subject,
                classroomNumber,
                hall,
                dayOfTheWeek,
                classTime,
                groups
            })
                .then(res => {
                    dispatch(addAdditional(res.data))
                })
        }
    }

    return (
        <div id="addForm">
            <button onClick={() => dispatch(switchFormDisplay())}>-</button>
            <ValidatorForm
                onSubmit={() => createNewAdditional()}
                onError={errors => console.log(errors)}
            >
                <FormControl className={classes.formControl}>
                    <SelectValidator
                        label="Предмет"
                        id="demo-simple-select"
                        value={subject}
                        onChange={handleChange("subject")}
                        validators={['required']}
                        errorMessages={['Это поле обязательно']}
                    >
                        {subjects.map((item, index) => {
                            return <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                        })}
                    </SelectValidator>
                </FormControl>

                <TextValidator
                    id="standard-name"
                    label="Аудитория"
                    value={classroomNumber}
                    onChange={handleChange('classroomNumber')}
                    margin="normal"
                    validators={['required', 'minStringLength: 1']}
                    errorMessages={['Это поле обязательно', 'Некорректное число']}
                />

                <FormControl className={classes.formControl}>
                    <SelectValidator
                        label="Корпус"
                        id="demo-simple-select"
                        value={hall}
                        onChange={handleChange("hall")}
                        validators={['required']}
                        errorMessages={['Это поле обязательно']}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                    </SelectValidator>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <SelectValidator
                        label="День недели"
                        id="demo-simple-select"
                        value={dayOfTheWeek}
                        onChange={handleChange("dayOfTheWeek")}
                        validators={['required']}
                        errorMessages={['Это поле обязательно']}
                    >
                        <MenuItem value={1}>Понедельник</MenuItem>
                        <MenuItem value={2}>Вторник</MenuItem>
                        <MenuItem value={3}>Среда</MenuItem>
                        <MenuItem value={4}>Четверг</MenuItem>
                        <MenuItem value={5}>Пятница</MenuItem>
                        <MenuItem value={6}>Суббота</MenuItem>
                    </SelectValidator>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <SelectValidator
                        label="Время"
                        id="demo-simple-select"
                        value={classTime}
                        onChange={handleChange("classTime")}
                        validators={['required']}
                        errorMessages={['Это поле обязательно']}
                    >
                        <MenuItem value={1}>8:00-9:35</MenuItem>
                        <MenuItem value={2}>9:50-11:25</MenuItem>
                        <MenuItem value={3}>11:40-13:15</MenuItem>
                        <MenuItem value={4}>13:50-15:25</MenuItem>
                        <MenuItem value={5}>15:40-17:15</MenuItem>
                        <MenuItem value={6}>17:30-19:05</MenuItem>
                        <MenuItem value={7}>19:20-20:55</MenuItem>
                    </SelectValidator>
                </FormControl>

                <Paper className={classes.root}>
                    {groups.map((item, index) => {
                        return (
                            <Chip
                                key={index}
                                label={item}
                                onDelete={handleDelete(item)}
                                className={classes.chip}
                            />
                        );
                    })}
                </Paper>

                <TextValidator
                    id="standard-name"
                    label="Группы"
                    value={groupValue}
                    onChange={changeGroupValue}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={addGroup}
                >
                    +
        </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                >
                    Добавить
        </Button>
            </ValidatorForm>
        </div>
    );
}
