import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "../Inputs/Button/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddTimetable() {
  const [classroomNumber, setClassroomNumber] = useState("");
  const [hall, setHall] = useState("");
  const [week, setWeek] = useState("");
  const [dayOfTheWeek, setDayOfTheWeek] = useState("");
  const [classTime, setClassTimel] = useState("");
  const [type, setType] = useState("");
  const [groups, setGroup] = useState([]);
  const [groupValue, setGroupValue] = useState("");
  const [course, setCourse] = useState("");
  const [groupPart, setgroupPart] = useState("");
  const [additional, setAdditional] = useState("");
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const changeClassroomNumber = (e) => {
    setClassroomNumber(e.target.value);
  };
  const changeHall = (e) => {
    setHall(e.target.value);
  };
  const changeWeek = (e) => {
    setWeek(e.target.value);
  };
  const changeDayOfTheWeek = (e) => {
    setDayOfTheWeek(e.target.value);
  };
  const changeClassTime = (e) => {
    setClassTimel(e.target.value);
  };
  const changeType = (e) => {
    setType(e.target.value);
  };
  const changeCourse = (e) => {
    setCourse(e.target.value);
  };
  const changeGroupPart = (e) => {
    setgroupPart(e.target.value);
  };
  const changeAdditional = (e) => {
    setAdditional(e.target.value);
  };
  const addEvent = () => {
    axios.post("http://localhost:3333/api/timetable", {
      teacher: "5e1f0a1e62169906f80b8cd8",
      subject: "5e3ad45fedf8c52e680a0a88",
      classroomNumber: classroomNumber,
      hall: hall,
      week: week,
      dayOfTheWeek: dayOfTheWeek,
      classTime: classTime,
      type: type,
      group: groups,
      course: course,
      groupPart: groupPart ? (groups.length > 1 ? 0 : groupPart) : 0,
      additional,
    });
    handleClose();
    window.location.reload(false);
  };

  const changeGroupValue = (e) => {
    if (e.target.value <= 10 && e.target.value >= 0) {
      setGroupValue(e.target.value);
    }
  };

  const addGroup = () => {
    if (!groups.includes(+groupValue)) {
      setGroup(groups.concat(+groupValue));
      setGroupValue("");
    } else {
      setGroupValue("");
    }
  };

  const handleDelete = (chipToDelete) => async () => {
    setGroup((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Добавить занятие
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
            <Button variant="contained" color="secondary" onClick={addGroup}>
              +
            </Button>
            <TextField
              id="standard-name"
              label="Курс"
              value={course}
              onChange={changeCourse}
              margin="normal"
            />
            {groups.length <= 1 && (
              <FormControl className={classes.formControl}>
                <SelectValidator
                  label="Подгруппа"
                  id="demo-simple-select"
                  value={groupPart}
                  onChange={changeGroupPart}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                </SelectValidator>
              </FormControl>
            )}
            <FormControl className={classes.formControl}>
              <SelectValidator
                label="Доп"
                id="demo-simple-select"
                value={additional}
                onChange={changeAdditional}
                validators={["required"]}
                errorMessages={["Это поле обязательно"]}
              >
                <MenuItem value={true}>Да</MenuItem>
                <MenuItem value={false}>Нет</MenuItem>
              </SelectValidator>
            </FormControl>
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
  );
}
