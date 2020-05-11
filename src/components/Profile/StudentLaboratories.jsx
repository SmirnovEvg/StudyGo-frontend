import styles from "./StudentLaboratories.module.sass"
import React, { useState, useEffect } from "react";
import AuthService from "../../services/AuthService";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import StudentLaboratoryWork from "./StudentLaboratoryWork";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    minWidth: 0
  },
}));

export default function StudentLaboratories() {
  const classes = useStyles();
  const [laboratoryClasses, setLaboratoryClasses] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(
    laboratoryClasses[0] ? laboratoryClasses[0]._id : ""
  );
  const [student, setStudent] = useState({});

  const token = AuthService.getToken();

  useEffect(() => {
    const getLaboratories = async () => {
      const user = await axios.get("http://localhost:3333/api/user", {
        headers: {
          Authorization: token,
        },
      });
      setStudent(user.data);

      axios
        .get("http://localhost:3333/api/laboratoryclass/student", {
          params: {
            course: user.data.course,
            group: user.data.group,
            groupPart: user.data.groupPart,
          },
        })
        .then((res) => {
          setLaboratoryClasses(res.data);
        });
    };
    getLaboratories();
  }, [token]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Paper elevation={3} className={styles.labsList}>
        <div className={classes.root}>
          <List component="nav">
            {laboratoryClasses &&
              laboratoryClasses.map((item, index) => (
                <ListItem
                  button
                  selected={selectedIndex === item._id}
                  onClick={(event) => handleListItemClick(event, item._id)}
                  key={index}
                  className={styles.labsListItem}
                >
                  <ListItemText primary={`${item.subject.name}`} />
                </ListItem>
              ))}
          </List>
        </div>
      </Paper>
      <Paper elevation={3} className={styles.labsContainer}>
        <StudentLaboratoryWork laboratoryId={selectedIndex} student={student} />
      </Paper>
    </>
  );
}
