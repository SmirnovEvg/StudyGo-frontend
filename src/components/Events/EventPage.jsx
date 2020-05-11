import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "../Inputs/Button/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDispatch } from 'react-redux';
import { removeEvent } from '../../actions';
import AuthService from '../../services/AuthService';

export default function EventPage(props) {
    const dispatch = useDispatch();
    let { match: { params } } = props;
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [postInfo, setPostInfo] = useState({});
    const [open, setOpen] = React.useState(false);

    const user = AuthService.getUser();  

    useEffect(() => {
        axios.get('http://localhost:3333/api/event/post', {
            params: {
                id: params.id
            }
        }).then(res => {
            setPostInfo(res.data);
            setEventName(res.data.name);
            setEventDescription(res.data.description);
        })
    }, [params.id, props]);

    const deleteEvent = () => {
        axios.delete('http://localhost:3333/api/event', {
            data: {
                id: postInfo._id
            }
        });
        dispatch(removeEvent(postInfo._id))
        props.history.push('/events');
    }

    const editEvent = () => {
        axios.put('http://localhost:3333/api/event', {
            eventId: postInfo._id,
            name: eventName,
            description: eventDescription,
        })
        .then(res => {
            setPostInfo(res.data)
            handleClose();
        })
    };

    const changeName = e => {
        setEventName(e.target.value);
    }
    const changeDescription = e => {
        setEventDescription(e.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {user.role === 2 && <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Изменить
            </Button>}
            {user.role === 2 && <Button variant="outlined" color="primary" onClick={deleteEvent}>
                Удалить
            </Button>}
            
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Добавить занятие"}</DialogTitle>
                <ValidatorForm
                    onSubmit={() => editEvent()}
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
                    Изменить
                    </Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>
            <h2>{postInfo.name}</h2>
            <p>{postInfo.description}</p>
        </div>
    )
}
