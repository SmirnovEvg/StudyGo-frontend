import styles from "./StudentLaboratoryWork.module.sass";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LaboratoryNumber from "./LaboratoryNumber";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function StudentLaboratoryWork(props) {
  const classes = useStyles();

  const [laboratoryClass, setLaboratoryClass] = useState({});
  const [laboratoryWorks, setLaboratoryWorks] = useState([]);
  const [laboratoryTime, setLaboratoryTime] = useState([]);

  useEffect(() => {
    const getLabs = async () => {
      if (props.laboratoryId) {
        try {
          const labClass = await axios.get(
            "http://localhost:3333/api/laboratoryclass/",
            {
              params: {
                classId: props.laboratoryId,
              },
            }
          );

          labClass.data[0].students = labClass.data[0].students.filter(
            (student) => {
              return student._id === props.student._id;
            }
          );

          setLaboratoryClass(labClass.data[0]);

          const lab = await axios.get(
            "http://localhost:3333/api/laboratory/student/",
            {
              params: {
                laboratoryClass: props.laboratoryId,
                student: props.student._id,
              },
            }
          );

          setLaboratoryWorks(lab.data);

          const labTime = await axios.get(
            "http://localhost:3333/api/laboratorytime/",
            {
              params: {
                laboratoryClass: props.laboratoryId,
              },
            }
          );

          setLaboratoryTime(labTime.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getLabs();
  }, [props.laboratoryId, props.student._id]);

  const generateNotificationID = () => {
    return `${(Math.random() * 1000000).toFixed(0)}${new Date().valueOf()}`;
  };

  const createTableHead = () => {
    let head = [];
    for (let i = 0; i < laboratoryClass.count; i++) {
      const labDate = laboratoryTime.filter((date) => {
        return date.number === i + 1;
      });

      head.push(
        <LaboratoryNumber
          key={generateNotificationID()}
          number={i}
          date={labDate}
          laboratoryClass={laboratoryClass._id}
        />
      );
    }
    return head;
  };

  const createStudentLine = (studentId) => {
    let line = [];
    if (laboratoryWorks.length) {
      for (let i = 1; i <= laboratoryClass.count; i++) {
        let lab = laboratoryWorks.filter((item) => {
          return item.student._id === studentId && item.number === i;
        });
        lab[0]
          ? line.push(
              <TableCell
                key={generateNotificationID()}
                className={styles.labNumber}
              >
                {lab[0].passed ? <p>{lab[0].passed}</p> : ''}
                {lab[0].visit ? <p>{lab[0].visit}</p> : ''}
              </TableCell>
            )
          : line.push(
              <TableCell
                key={generateNotificationID()}
                className={styles.labNumber}
              >
                <p>-</p>
              </TableCell>
            );
      }
    }
    return line;
  };

  return (
      <Table aria-label="simple table" className={classes.table}>
        <TableHead key="name">{createTableHead()}</TableHead>
        <TableBody>
          {laboratoryClass &&
            laboratoryClass.students &&
            laboratoryClass.students.map((item, i) => (
              <TableRow key={i}>
                {createStudentLine && createStudentLine(item._id)}
              </TableRow>
            ))}
        </TableBody>
      </Table>
  );
}
