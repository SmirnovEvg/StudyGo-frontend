import React, { Component } from "react";
import styles from './Timetable.module.sass';
import axios from "axios";
import AuthService from "../../services/AuthService";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from "../Inputs/Radio/Radio";
import WeekTimetable from "./WeekTimetable";
import TimetableService from "../../services/TimetableService";
import userIsAuthenticatedRedirect from "../wrappers/userIsAuthenticatedRedirect";
import AddTimetable from "./AddTimetable";
import ImportTimetable from "./ImportTimetable";
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from "@material-ui/core/styles";
import _ from 'lodash';

const style = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    left: '-10px'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class Timetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      firstWeek: [],
      secondWeek: [],
      weekNumber: TimetableService.getWeekNumber().toString(),
      teachers: [],
      subjects: [],
      course: '',
      group: '',
      groupPart: '',
    };
  }

  componentDidMount = async () => {
    const token = AuthService.getToken();

    const user = await axios.get("http://localhost:3333/api/user", {
      headers: {
        Authorization: token,
      },
    });

    this.setState({userInfo:user.data});

    if (user.data.userId.role === 0) {
      const res = await axios.get("http://localhost:3333/api/timetable/", {
        params: {
          course: user.data.course,
          group: user.data.group,
          groupPart: user.data.groupPart,
        },
      });

      this.setState({
        firstWeek:
          res.data &&
          res.data.filter((item) => item.week === 1).length &&
          res.data.filter((item) => item.week === 1)[0].dayOfTheWeek,
        secondWeek:
          res.data.length &&
          res.data.filter((item) => item.week === 2).length &&
          res.data.filter((item) => item.week === 2)[0].dayOfTheWeek,
      });
    } else{
      const res = await axios.get(
        "http://localhost:3333/api/timetable/teacher",
        {
          params: {
            teacher: user.data.userId._id,
          },
        }
      );

      this.setState({
        firstWeek:
          res.data &&
          res.data.filter((item) => item.week === 1).length &&
          res.data.filter((item) => item.week === 1)[0].dayOfTheWeek,
        secondWeek:
          res.data.length &&
          res.data.filter((item) => item.week === 2).length &&
          res.data.filter((item) => item.week === 2)[0].dayOfTheWeek,
      });
    }

    const teacherList = await axios.get(
      "http://localhost:3333/api/user/teachers/",{}
      );
      this.setState({
        teachers: teacherList.data
      })

    const subjectList = await axios.get(
      "http://localhost:3333/api/subject",{}
      );
      this.setState({
        subjects: subjectList.data
      })
  };

  componentDidUpdate = async () => {
    if (this.state.course && this.state.group && this.state.groupPart) {      
      const res = await axios.get("http://localhost:3333/api/timetable/", {
        params: {
          course: this.state.course,
          group: this.state.group,
          groupPart: this.state.groupPart,
        },
      });

      if(res.data.length && 
      res.data.filter((item) => item.week === 1).length && 
      _.isEqual(res.data.filter((item) => item.week === 1)[0].dayOfTheWeek, this.state.secondWeek) === false &&
      _.isEqual(res.data.filter((item) => item.week === 2)[0].dayOfTheWeek, this.state.secondWeek) === false){
        this.setState({
        firstWeek:
          res.data &&
          res.data.filter((item) => item.week === 1).length &&
          res.data.filter((item) => item.week === 1)[0].dayOfTheWeek,
        secondWeek:
          res.data.length &&
          res.data.filter((item) => item.week === 2).length &&
          res.data.filter((item) => item.week === 2)[0].dayOfTheWeek,
      });
      }
    }
    else {
      const res = await axios.get(
        "http://localhost:3333/api/timetable/teacher",
        {
          params: {
            teacher: this.state.userInfo.userId._id,
          },
        }
      );
      console.log(this.state.userInfo.userId._id);
      console.log(res);
      

      if(res.data.length && 
      res.data.filter((item) => item.week === 1).length && 
      _.isEqual(res.data.filter((item) => item.week === 1)[0].dayOfTheWeek, this.state.secondWeek) === false &&
      _.isEqual(res.data.filter((item) => item.week === 2)[0].dayOfTheWeek, this.state.secondWeek) === false){
        this.setState({
          firstWeek:
            res.data &&
            res.data.filter((item) => item.week === 1).length &&
            res.data.filter((item) => item.week === 1)[0].dayOfTheWeek,
          secondWeek:
            res.data.length &&
            res.data.filter((item) => item.week === 2).length &&
            res.data.filter((item) => item.week === 2)[0].dayOfTheWeek,
        });
      }
    }
  }

  handleChange = (name) => (event) => {
    this.setState({ ...this.state, [name]: event.target.value });
  };

  render() {
    const { userInfo, weekNumber, firstWeek, secondWeek, teachers, subjects, course, groupPart, group } = this.state;
    const { classes } = this.props;

    return (
      <div className={styles.timetableContainer}>
        <div className={styles.timetableOptions}>
          <div className={styles.timetableWeek}>
            <div className={styles.timetableWeekIcon}>
              {weekNumber === '1' ? 'I' : 'II'}
            </div>
            <Radio
              checked={weekNumber === "1"}
              onChange={this.handleChange("weekNumber")}
              value="1"
              name="weekNumber"
              color="default"
            />
            <Radio
              checked={weekNumber === "2"}
              onChange={this.handleChange("weekNumber")}
              value="2"
              name="weekNumber"
              color="default"
            />
            <div className={styles.timetableWeekButtons}>
              {userInfo.userId && userInfo.userId.role === 2 && <AddTimetable teachers={teachers} subjects={subjects} />}
              {userInfo.userId && userInfo.userId.role === 2 && <ImportTimetable />}
              {userInfo.userId && userInfo.userId.role === 2 && (
                <div className={styles.filterForm}>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Курс</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={course}
                      onChange={this.handleChange("course")}
                      className={classes.formControl}
                    >
                      <MenuItem value=''>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Группа</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={group}
                      onChange={this.handleChange("group")}
                      className={classes.formControl}
                    >
                      <MenuItem value=''>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Подгруппа</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={groupPart}
                      onChange={this.handleChange("groupPart")}
                      className={classes.formControl}
                    >
                      <MenuItem value=''>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}
            </div>
          </div>
        </div>
          <div className={styles.timetable}>
            {weekNumber === "1" ? (
              <WeekTimetable week={firstWeek} teachers={teachers} subjects={subjects}/>
            ) : (
              <WeekTimetable week={secondWeek} teachers={teachers} subjects={subjects}/>
            )}
          </div>
        
      </div>
    );
  }
}

export default userIsAuthenticatedRedirect(withStyles(style, { withTheme: true })(Timetable));
