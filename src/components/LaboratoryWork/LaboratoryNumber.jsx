import './Number.sass';
import React, { useEffect } from 'react';
import axios from 'axios';
import dateFormat from 'dateformat';
import TableCell from '@material-ui/core/TableCell';

import 'date-fns';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "../Inputs/Button/Button";
import TextField from '@material-ui/core/TextField';
import "moment/locale/ru";

export default function LaboratoryNumber(props) {
    const [selectedDate, setSelectedDate] = React.useState('');
    const [name, setName] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    useEffect(() => {
        const setSelected = async () => {
            if (props.date.length) {
                setSelectedDate(props.date[0].date);
                setName(props.date[0].name);
            }
        }
        setSelected();
    }, [props])

    const generateNotificationID = () => {
        return `${(Math.random() * 1000000).toFixed(0)}${new Date().valueOf()}`;
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDialogOpen = () => {
        console.log(props.date[0]);
        
        setOpenDialog(true);
        setOpen(false)
    };

    const changeName = (e) => {
        setName(e.target.value);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const titleText = (date, name) => {
        if (date && !name) {
            return <p style={{ padding: 0, margin: 0 }}>{dateFormat(new Date(selectedDate), 'dd / mm / yyyy')}</p>;
        }
        else if (!date && name) {
            return <p style={{ padding: 0, margin: 0 }}>{name}</p>;
        }
        else if (date && name) {
            return <p style={{ padding: 0, margin: 0 }}>{dateFormat(new Date(selectedDate), 'dd / mm / yyyy')} <br /> {name}</p>;
        }
        else {
            return '';
        }
    }

    const changeDate = () => {
        props.date[0] ? (
            axios.put('http://localhost:3333/api/laboratorytime', {
                id: props.date[0]._id,
                date: selectedDate,
                name
            }).then(res => {
                setSelectedDate(res.data.date);
                setOpenDialog(false);
            })
        ) : (
                axios.post('http://localhost:3333/api/laboratorytime', {
                    laboratoryclass: props.laboratoryClass,
                    number: props.number + 1,
                    date: selectedDate ? selectedDate : new Date(),
                    name
                }).then(res => {
                    setSelectedDate(res.data.date);
                    setOpenDialog(false);
                })
            )
    }

    return (
        <TableCell key={props.number} style={{ borderBottom: '1px solid #000' }}>
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Тема и дата занятия"}</DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={selectedDate ? selectedDate : new Date()}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <TextField id="standard-basic" value={name} onChange={changeName} label="Название" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} variant="contained" color="primary">
                        Отмена
                    </Button>
                    <Button type="button" variant="contained" color="primary" onClick={changeDate}>
                        Изменить
                    </Button>
                </DialogActions>
            </Dialog>
            <Tooltip
                key={generateNotificationID()}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                title={titleText(selectedDate, name)}
            >
                <button className="timetable-head-number" onClick={handleDialogOpen}>{props.number + 1}</button>
            </Tooltip>
        </TableCell >
    )
}