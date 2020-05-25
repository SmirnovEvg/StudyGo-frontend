import React, { useState, useEffect } from "react";
import styles from './LessonTimetable.module.sass';
import { PropTypes } from "prop-types";

import axios from "axios";
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
import AuthService from "../../services/AuthService";
import TimetableService from "../../services/TimetableService";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function LessonTimetable({ lesson, teachers, subjects }) {
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
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const user = AuthService.getUser();  

  useEffect(() => {
    setClassroomNumber(lesson.classroomNumber);
    setHall(lesson.hall);
    setWeek(lesson.week);
    setDayOfTheWeek(lesson.dayOfTheWeek);
    setClassTimel(lesson.classTime);
    setType(lesson.type);
    setGroup(lesson.group);
    setCourse(lesson.course);
    lesson.groupPart && setgroupPart(lesson.groupPart);
    setAdditional(lesson.additional);
    setTeacher(lesson.teacher._id);
    setSubject(lesson.subject._id);
  }, [lesson]);

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
  const changeTeacher = (e) => {
    setTeacher(e.target.value);
  };
  const changeSubject = (e) => {
    setSubject(e.target.value);
  };

  const editTimetable = () => {
    if (groups.length) {
      axios.put("http://localhost:3333/api/timetable", {
        timetableId: lesson._id,
        teacher: teacher,
        subject: subject,
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
    }
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
      groups.length > 1 && setgroupPart("");
    } else {
      setGroupValue("");
    }
  };

  const handleDelete = (chipToDelete) => async () => {
    console.log(chipToDelete);
    
    setGroup((chips) => chips.filter((chip) => chip !== chipToDelete));
    groups.length > 1 && setgroupPart("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const removeLesson = () => {
    axios.delete("http://localhost:3333/api/timetable", {
      data: {
        id: lesson._id,
      },
    });
    handleClose();
    window.location.reload(false);
  };

  const getLessonTypeClass = (type) => {
    switch (type) {
      case 0:
        return styles.lessonTypeLk
      case 1:
        return styles.lessonTypeLb
      case 2:
        return styles.lessonTypePz
      default:
        break;
    }
  }

  return (
    <>
    <Paper elevation={3} className={styles.lesson} onClick={() => handleOpen()}>
      <div className={styles.lessonMainInfoHeader}>
        <h6>{lesson.subject.name}</h6>
      </div>
      <div>
        <div className={styles.lessonMainInfo}>
          <p>{`${lesson.teacher.secondName} ${lesson.teacher.firstName[0]}. ${lesson.teacher.thirdName[0]}.`}</p>
          <p>{TimetableService.getFullClassTime(lesson.classTime)}</p>
        </div>
        <div className={styles.lessonBricks}>
          <div className={`${styles.lessonType} ${getLessonTypeClass(lesson.type)}`}>{TimetableService.getFullLessonType(lesson.type)}</div>
          <div className={styles.lessonClassroom}>{lesson.classroomNumber}-{lesson.hall}</div>
          {!user.role && lesson.additional && <div className={styles.lessonAdd}>Доп</div>}
          <div className={styles.lessonGroup}>
            {user.role ? ( 
              lesson.group.map((group, index) => {
              return (
                <div key={index} >
                  {group}
                </div>
              );
            })): (
              <></>
            )}
          </div>
        </div>
      </div>
    </Paper>
      {user.role === 2 && <div className="lesson__edit-form">
        <Dialog
          open={open}
          onClose={() => handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Редактировать занятие"}
          </DialogTitle>
          <ValidatorForm
            onSubmit={editTimetable}
            onError={(errors) => console.log(errors)}
          >
            <DialogContent>
              <FormControl className={classes.formControl}>
                <SelectValidator
                  label="Преподаватель"
                  id="demo-simple-select"
                  value={teacher}
                  onChange={changeTeacher}
                  validators={["required"]}
                  errorMessages={["Это поле обязательно"]}
                >
                  {teachers.map((person) => {
                    return (
                      <MenuItem
                        key={person._id}
                        value={person._id}
                      >{`${person.secondName} ${person.firstName[0]}. ${person.thirdName[0]}.`}</MenuItem>
                    );
                  })}
                </SelectValidator>
              </FormControl>

              <FormControl className={classes.formControl}>
                <SelectValidator
                  label="Предмет"
                  id="demo-simple-select"
                  value={subject}
                  onChange={changeSubject}
                  validators={["required"]}
                  errorMessages={["Это поле обязательно"]}
                >
                  {subjects.map((sub) => {
                    return (
                      <MenuItem key={sub._id} value={sub._id}>
                        {sub.name}
                      </MenuItem>
                    );
                  })}
                </SelectValidator>
              </FormControl>

              <TextValidator
                id="standard-name"
                label="Аудитория"
                value={classroomNumber}
                onChange={changeClassroomNumber}
                margin="normal"
                validators={["required", "minStringLength: 1"]}
                errorMessages={["Это поле обязательно", "Некорректное число"]}
              />

              <FormControl className={classes.formControl}>
                <SelectValidator
                  label="Корпус"
                  id="demo-simple-select"
                  value={hall}
                  onChange={changeHall}
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
                  label="Неделя"
                  id="demo-simple-select"
                  value={week}
                  onChange={changeWeek}
                  validators={["required"]}
                  errorMessages={["Это поле обязательно"]}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                </SelectValidator>
              </FormControl>

              <FormControl className={classes.formControl}>
                <SelectValidator
                  label="День недели"
                  id="demo-simple-select"
                  value={dayOfTheWeek}
                  onChange={changeDayOfTheWeek}
                  validators={["required"]}
                  errorMessages={["Это поле обязательно"]}
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
                  onChange={changeClassTime}
                  validators={["required"]}
                  errorMessages={["Это поле обязательно"]}
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

              <FormControl className={classes.formControl}>
                <SelectValidator
                  label="Тип занятия"
                  id="demo-simple-select"
                  value={type}
                  onChange={changeType}
                  validators={["required"]}
                  errorMessages={["Это поле обязательно"]}
                >
                  <MenuItem value={0}>ЛК</MenuItem>
                  <MenuItem value={1}>ЛБ</MenuItem>
                  <MenuItem value={2}>ПЗ</MenuItem>
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

              <Button variant="contained" color="secondary" onClick={addGroup}>
                +
              </Button>

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
              <Button onClick={removeLesson} variant="contained" color="secondary">
                Удалить
              </Button>
              <Button onClick={handleClose} variant="contained" color="secondary">
                Отмена
              </Button>
              <Button type="submit" variant="contained" color="secondary">
                Изменить
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>}
      </>
  );
}

LessonTimetable.propTypes = {
  lesson: PropTypes.object.isRequired,
};
