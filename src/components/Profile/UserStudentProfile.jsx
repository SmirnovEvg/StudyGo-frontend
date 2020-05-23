import React from "react";
import styles from "./UserStudentProfile.module.sass";
import { PropTypes } from "prop-types";
import { ReactComponent as FITLogo } from "../../static/images/FITLogo.svg";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../Inputs/Button/Button";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "36px",
  },
}));

function UserStudentProfile(props) {
  const classes = useStyles();

  const sendMessage = () => {
    props.history.push(props.dialog ? `/chat/${props.dialog}` : `/chat/user/${props.id}`);
  }

  return (
    <div className={styles.profileContent}>
      <div className={styles.profileLogo}>
        <FITLogo />
      </div>
      <Paper elevation={3} className={`${classes.root} ${styles.userInfo}`}>
        <div className={styles.userMainInfo}>
          <p>Фамилия</p>
          <h3>{props.secondName}</h3>
          <p>Имя</p>
          <h3>{props.firstName}</h3>
          <p>Отчество</p>
          <h3>{props.thirdName}</h3>
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
        <div className={styles.messageButton}>
            <Button variant="contained" color="secondary" onClick={sendMessage}>
            Отправить сообщение
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default withRouter(UserStudentProfile);

UserStudentProfile.propTypes = {
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
};
