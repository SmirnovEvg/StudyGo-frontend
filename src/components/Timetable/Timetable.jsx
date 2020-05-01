import React, { Component } from "react";
import axios from "axios";
import AuthService from "../../services/AuthService";

import Radio from "../Inputs/Radio/Radio";
import WeekTimetable from "./WeekTimetable";
import TimetableService from "../../services/TimetableService";
import userIsAuthenticatedRedirect from "../wrappers/userIsAuthenticatedRedirect";
import AddTimetable from "./AddTimetable";
import ImportTimetable from "./ImportTimetable";

class Timetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstWeek: [],
      secondWeek: [],
      weekNumber: TimetableService.getWeekNumber().toString(),
    };
  }

  componentDidMount = async () => {
    const token = AuthService.getToken();

    const user = await axios.get("http://localhost:3333/api/user", {
      headers: {
        Authorization: token,
      },
    });
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
    } else if (user.data.userId.role === 1) {
      const res = await axios.get("http://localhost:3333/api/timetable/teacher", {
        params: {
          teacher: user.data.userId._id,
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
    }
  };

  handleChange = (name) => (event) => {
    this.setState({ ...this.state, [name]: event.target.value });
  };

  render() {
    const { weekNumber, firstWeek, secondWeek } = this.state;

    return (
      <div>
        <AddTimetable />
        <ImportTimetable />
        <Radio
          checked={weekNumber === "1"}
          onChange={this.handleChange("weekNumber")}
          value="1"
          name="weekNumber"
        />
        <Radio
          checked={weekNumber === "2"}
          onChange={this.handleChange("weekNumber")}
          value="2"
          name="weekNumber"
        />
        {weekNumber === "1" ? (
          <WeekTimetable week={firstWeek} />
        ) : (
          <WeekTimetable week={secondWeek} />
        )}
      </div>
    );
  }
}

export default userIsAuthenticatedRedirect(Timetable);
