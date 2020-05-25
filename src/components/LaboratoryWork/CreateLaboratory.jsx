import React, { useState } from "react";
import axios from "axios";
import Button from "../Inputs/Button/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {
  ValidatorForm,
  SelectValidator,
  TextValidator
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
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
  },
}));

export default function CreateLaboratory({teacher}) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [group, setGroup] = useState("");
  const [course, setCourse] = useState("");
  const [groupPart, setGroupPart] = useState("");
  const [count, setCount] = useState("");

  const classes = useStyles();  

  const changeCount = (e) => {
    setCount(e.target.value);
  };

  const changeCourse = (e) => {
    setCourse(e.target.value);
  };

  const changeSubject = (e) => {
    setSubject(e.target.value);
  };

  const changeGroup = (e) => {
    setGroup(e.target.value);
  };

  const changeGroupPart = (e) => {
    setGroupPart(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addLaboratory = () => {
    axios.post("http://localhost:3333/api/laboratoryclass", {
      teacher: teacher.userId._id,
      subject,
      group,
      course,
      groupPart,
      count,
    });
    handleClose();
    window.location.reload(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Добавить лабораторное занятие
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Добавить занятие"}</DialogTitle>
        <ValidatorForm
          onSubmit={() => addLaboratory()}
          onError={(errors) => console.log(errors)}
        >
          <DialogContent>
            <FormControl className={classes.formControl}>
                <SelectValidator
                    label="Предмет"
                    id="demo-simple-select"
                    value={subject}
                    onChange={changeSubject}
                    validators={["required"]}
                    errorMessages={["Это поле обязательно"]}
                >
                    {teacher && teacher.subjects && teacher.subjects.map(item => {
                    return (
                        <MenuItem key={item._id} value={item._id}>
                        {item.name}
                        </MenuItem>
                    );
                    })}
                </SelectValidator>
            </FormControl>

            <FormControl className={classes.formControl}>
              <SelectValidator
                label="Курс"
                id="demo-simple-select"
                value={course}
                onChange={changeCourse}
                validators={["required"]}
                errorMessages={["Это поле обязательно"]}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </SelectValidator>
            </FormControl>

            <FormControl className={classes.formControl}>
              <SelectValidator
                label="Группа"
                id="demo-simple-select"
                value={group}
                onChange={changeGroup}
                validators={["required"]}
                errorMessages={["Это поле обязательно"]}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={4}>5</MenuItem>
                <MenuItem value={4}>6</MenuItem>
                <MenuItem value={4}>7</MenuItem>
                <MenuItem value={4}>8</MenuItem>
                <MenuItem value={4}>9</MenuItem>
                <MenuItem value={4}>10</MenuItem>
              </SelectValidator>
            </FormControl>

            <FormControl className={classes.formControl}>
              <SelectValidator
                label="Подгруппа"
                id="demo-simple-select"
                value={groupPart}
                onChange={changeGroupPart}
                validators={["required"]}
                errorMessages={["Это поле обязательно"]}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
              </SelectValidator>
            </FormControl>

            <TextValidator
                id="standard-name"
                label="Количество"
                value={count}
                onChange={changeCount}
                margin="normal"
                validators={["required", "minNumber: 1"]}
                errorMessages={["Это поле обязательно", "Некорректное число"]}
            />
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
  );
}
