import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../actions';
import Button from "../Inputs/Button/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function AddEvent() {
    const dispatch = useDispatch();
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [open, setOpen] = React.useState(false);
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
                setEventDescription('');
                handleClose();
            })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Добавить
            </Button>
        <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Добавить занятие"}</DialogTitle>
                <ValidatorForm
                    onSubmit={() => addEvent()}
                    onError={(errors) => console.log(errors)}
                >
                <DialogContent>
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
            </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Отмена
                    </Button>
                    <Button type="submit" color="primary" autoFocus>
                    Добавить
                    </Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    )
}
