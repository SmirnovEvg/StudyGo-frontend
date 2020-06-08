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
    const [eventImage, setEventImage] = useState(null);
    const [eventDescription, setEventDescription] = useState('');
    const [open, setOpen] = React.useState(false);
    const changeName = e => {
        setEventName(e.target.value);
    }
    const changeDescription = e => {
        setEventDescription(e.target.value)
    }

    const addEvent = () => {
        const formData = new FormData();
        formData.append('file', eventImage);
        formData.append('name', eventName);
        formData.append('description', eventDescription);
        formData.append('date', new Date(Date.now()));
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('http://localhost:3333/api/event', formData, config)
        .then(res => {
            dispatch(createEvent(res.data))
            setEventName('');
            setEventDescription('');
            handleClose();
        })
    }

    const getImage = (e) => {
        setEventImage(e.target.files[0]);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
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
                    <DialogContent style={{display: 'flex', flexDirection: 'column'}}>
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
                            style={{width: '500px'}}
                        />
                        <Button variant="contained" color="primary" component="label">
                            Загрузить файл
                            <input
                                type="file"
                                style={{ display: "none" }}
                                onChange={getImage}
                                accept="image/*"
                                name="file"
                            />
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="primary">
                            Отмена
                    </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Добавить
                    </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    )
}
