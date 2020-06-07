import React, { useState, useEffect } from "react";
import styles from "./StudentProfile.module.sass";
import { withRouter } from "react-router";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { PropTypes } from "prop-types";
import StudentLaboratories from "./StudentLaboratories";
import { makeStyles } from "@material-ui/core/styles";
import AuthService from "../../services/AuthService";
import Button from "../Inputs/Button/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "36px",
  },
}));

function StudentProfile(props) {
  const classes = useStyles();
  const [allLabs, setAllLabs] = useState(0);
  const [passedLabs, setPassedLabs] = useState(0);
  const [allLabsDialog, setAllLabsDialog] = useState(false);
  useEffect(() => {
    const getAllLaboratories = async () => {
      await axios
        .get(
          "http://localhost:3333/api/laboratoryclass/allstudentlaboratories/",
          {
            params: {
              studentId: props.studentId,
            },
          }
        )
        .then((res) => {
          setAllLabs(res.data.count);
        });

      await axios
        .get(
          "http://localhost:3333/api/laboratory/allpassedstudentlaboratories/",
          {
            params: {
              studentId: props.studentId,
            },
          }
        )
        .then((res) => {
          setPassedLabs(res.data.count);
        });
    };
    getAllLaboratories();
  }, [props.studentId]);

  const signOut = () => {
    AuthService.removeTokenUser();
    props.history.push("/auth");
    window.location.reload(false);
  };

  const toggleHover = () => {
    setAllLabsDialog(!allLabsDialog)
  }

  return (
    <div className={styles.profileContent}>
      <StudentLaboratories />
      <Paper elevation={3} className={`${classes.root} ${styles.userInfo}`}>
        <div className={styles.userUpperInfo}>
          <div className={styles.userMainInfo}>
            <p>Фамилия</p>
            <h3>{props.secondName}</h3>
            <p>Имя</p>
            <h3>{props.firstName}</h3>
            <p>Отчество</p>
            <h3>{props.thirdName}</h3>
            <p>Номер студенческого</p>
            <h3>{props.studnumber}</h3>
          </div>
          <div className={styles.userLabsInfo}>
            <p>{passedLabs}/{allLabs}</p>
            <h3
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
            >
              {passedLabs && allLabs && Math.round((passedLabs * 100) / allLabs)}%
            </h3>
            <p>Процент защищенных лабораторных работ</p>
            <Paper elevation={3} className={styles.allLabs} style={allLabsDialog ? { opacity: 0 } : { opacity: 0 }}>
              fef
            </Paper>
          </div>
        </div>
        <div className={styles.userGroupInfo}>
          <div>
            <h3>{props.course}</h3>
            <p>Курс</p>
          </div>
          <div>
            <h3>{props.group}</h3>
            <p>Группа</p>
          </div>
          <div>
            <h3>{props.groupPart}</h3>
            <p>Подгруппа</p>
          </div>
        </div>
        <div className={styles.signOutButton}>
          <Button variant="contained" color="secondary" onClick={signOut}>
            Выйти
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default withRouter(StudentProfile)

StudentProfile.propTypes = {
  studnumber: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  firstName: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  secondName: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  thirdName: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  course: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  group: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  groupPart: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};