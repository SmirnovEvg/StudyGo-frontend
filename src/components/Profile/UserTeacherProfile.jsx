import React from "react";
import styles from "./UserTeacherProfile.module.sass";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { PropTypes } from "prop-types";
import TimetableService from "../../services/TimetableService";

const useStyles = makeStyles((theme) => ({
    root: {
      padding: "36px",
    },
  }));
export default function UserTeachertProfile(props) {
    console.log(props);
    
  const classes = useStyles();
  return (
    <div className={styles.profileContent}>
      <Paper elevation={3} className={`${classes.root} ${styles.userInfo}`}>
        <div className={styles.userGroupInfo}>
          <p>Фамилия</p>
          <h3>{props.secondName}</h3>
          <p>Имя</p>
          <h3>{props.firstName}</h3>
          <p>Отчество</p>
          <h3>{props.thirdName}</h3>
          <p>Кафедра</p>
          <h3>{props.department}</h3>
          <p>Должность</p>
          <h3>{props.rank}</h3>
        </div>
      </Paper>
      <Paper elevation={3} className={`${classes.root} ${styles.subjectList}`}>
        <h2>Преподаваемые дисциплины</h2>
        {props.subjects.map((subject) => {
          return <p key={subject._id}>{subject.name}</p>;
        })}
      </Paper>
      <div className={styles.additionalsContainer}>
        <div className={styles.additionalList}>
          {props.additionals &&
            props.additionals.map((item) => {
              return (
                <Paper
                  elevation={3}
                  key={item._id}
                  className={styles.additionalBlock}
                >
                  <div className={styles.additionalBlockHeader}>
                    <h6>{item.subject}</h6>
                  </div>
                  <div>
                    <div className={styles.additionalBlockTime}>
                      <p className={styles.additionalDayOfTheWeek}>
                        {TimetableService.getFullDayOfTheWeek(
                          item.dayOfTheWeek
                        )}
                      </p>
                      <p className={styles.additionalTime}>
                        {TimetableService.getFullClassTime(item.classTime)}
                      </p>
                    </div>
                    <div className={styles.additionalBlockBricks}>
                      <p className={styles.additionalWeek}>
                        {TimetableService.convertWeek(item.week)}
                      </p>
                      <p className={styles.additionalClassroomNumber}>
                        {item.classroomNumber}
                      </p>
                      {item.group.map((group, index) => {
                        return (
                          <p key={index} className={styles.additionalGroup}>
                            {group}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </Paper>
              );
            })}
        </div>
      </div>
    </div>
  );
}

UserTeachertProfile.propTypes = {
  firstName: PropTypes.string.isRequired,
  secondName: PropTypes.string.isRequired,
  thirdName: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  rank: PropTypes.string.isRequired,
};
