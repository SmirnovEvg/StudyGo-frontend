import React, { useState } from "react";
import XLSX from "xlsx";
import axios from "axios";
import Button from "../Inputs/Button/Button";
import {
  SelectValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Notification from '../Inputs/Notification/Notification';

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
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ImportTimetable() {
  const [exsel, setExsel] = useState([]);
  const [course, setCourse] = useState("");
  const [open, setOpen] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false)
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getExcel = (e) => {
    const file = e.target.value.toLowerCase();
    const regex = new RegExp("(.*?).(xlsx|xls)$");

    if (regex.test(file)) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);

      reader.onload = () => {
        const data = new Uint8Array(reader.result);
        const wb = XLSX.read(data, { type: "array" });
        const first_worksheet = wb.Sheets[wb.SheetNames[0]];
        const htmlstr = XLSX.utils.sheet_to_json(first_worksheet, {
          header: "A",
        });
        const timetable = htmlstr.map((lesson) => {
          const groups = lesson.C.toString().split(",");
          return {
            teacher: lesson.A,
            subject: lesson.B,
            group: groups,
            groupPart: groups.length > 1 ? 0 : lesson.D,
            course: lesson.E,
            classroomNumber: lesson.F,
            hall: lesson.G,
            classTime: lesson.H,
            week: lesson.I,
            dayOfTheWeek: lesson.J,
            additional: lesson.K ? true : false,
            type: lesson.L,
          };
        });
        setExsel(timetable);
      };
    } else {
      console.log("failed");
    }
  };

  const setNewExcel = async () => {
    try {
      if (exsel.length) {
        await axios.delete("http://localhost:3333/api/timetable/clear", {
          data: {
            course,
          },
        });
        for (let i = 0; i < exsel.length; i++) {
          const element = exsel[i];
          await axios.post("http://localhost:3333/api/timetable/import", {
            teacher: element.teacher,
            subject: element.subject,
            classroomNumber: element.classroomNumber,
            hall: element.hall,
            week: element.week,
            dayOfTheWeek: element.dayOfTheWeek,
            classTime: element.classTime,
            type: element.type,
            group: element.group,
            course: element.course,
            groupPart: element.groupPart,
            additional: element.additional,
          });
        }
        handleClose();
        window.location.reload(false);
      }
    } catch (error) {
      setErrorAlert(true)
      setTimeout(() => {
        setErrorAlert(false);
      }, 6000)
    }

  };

  const changeCourse = (e) => {
    setCourse(e.target.value);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Импортировать расписание
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Импорт расписания"}</DialogTitle>
        <ValidatorForm
          onSubmit={setNewExcel}
          onError={(errors) => console.log(errors)}
        >
          <DialogContent>
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
            <Button variant="contained" component="label">
              Загрузить файл
              <input
                type="file"
                style={{ display: "none" }}
                onChange={getExcel}
                accept=".xls,.xlsx"
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="contained">
              Отмена
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={exsel.length ? false : true}
            >
              Импортировать расписание
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
      <Notification alertOpen={errorAlert} type="error" text="Ошибка импорта. Проверьте Exsel-файл" />
    </div>
  );
}
