import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../actions';
import Button from "../Inputs/Button/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function AddEvent() {
    const dispatch = useDispatch();
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const changeName = e => {
        setEventName(e.target.value);
    }
    const changeDescription = e => {
        setEventDescription(e.target.value)
    }
    const addEvent = () => {
        axios.post('http://localhost:3333/api/event', {
            name: eventName,
            description: eventDescription,
            date: new Date(Date.now())
        })
            .then(res => {
                dispatch(createEvent(res.data))
                setEventName('');
                setEventDescription('')
            })
    }
    return (
        <div>
            <ValidatorForm
                    onSubmit={() => addEvent()}
                >
            <TextValidator
                id="standard-name"
                label="Название"
                value={eventName}
                onChange={changeName}
                margin="normal"
                validators={['required']}
                errorMessages={['Это поле обязательно']}
            />
            <TextValidator
                id="standard-name"
                label="Наполнение"
                value={eventDescription}
                onChange={changeDescription}
                margin="normal"
                multiline
                rows={6}
                validators={['required']}
                errorMessages={['Это поле обязательно']}
            />
            <Button
                variant="contained"
                color="secondary"
                type="submit"
            >
                Добавить
        </Button>
        </ValidatorForm>
        </div>
    )
}
