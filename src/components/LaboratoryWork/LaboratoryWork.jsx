import React, { useState, useEffect } from "react";
import styles from './LaboratoryWork.module.sass'
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import LaboratoryNumber from "./LaboratoryNumber";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
    overflowX: 'auto',
    display: 'flex',
    flex: 1
  },
}));

const LaboratoryWork = (props) => {
  const classes = useStyles();
  const [laboratoryClass, setLaboratoryClass] = useState({});
  const [laboratoryWorks, setLaboratoryWorks] = useState([]);
  const [laboratoryTime, setLaboratoryTime] = useState([]);

  let {
    match: { params },
  } = props;

  useEffect(() => {
    const getLabs = async () => {
      if (params.laboratoryId) {
        try {
          const labClass = await axios.get(
            "http://localhost:3333/api/laboratoryclass",
            {
              params: {
                classId: params.laboratoryId,
              },
            }
          );
          function compare(a, b) {
            if (a.userId.secondName < b.userId.secondName) {
              return -1;
            }
            if (a.userId.secondName > b.userId.secondName) {
              return 1;
            }
            return 0;
          }

          labClass.data[0].students.sort(compare);
          setLaboratoryClass(labClass.data[0]);

          const lab = await axios.get("http://localhost:3333/api/laboratory", {
            params: {
              laboratoryClass: params.laboratoryId,
            },
          });
          setLaboratoryWorks(lab.data);

          const labTime = await axios.get(
            "http://localhost:3333/api/laboratorytime",
            {
              params: {
                laboratoryClass: params.laboratoryId,
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
  }, [params.laboratoryId]);

  const editLaboratoryWork = (id, passed) => (e) => {
    if (e.target.value && e.target.value <= 10 && e.target.value > 0) {
      axios.put("http://localhost:3333/api/laboratory", {
        laboratoryId: id,
        passed: e.target.value,
      });
    } else {
      e.target.value = passed;
    }
  };

  const setLaboratoryWork = (student, number) => (e) => {
    if (e.target.value && e.target.value <= 10 && e.target.value > 0) {
      axios.post("http://localhost:3333/api/laboratory", {
        laboratoryclass: laboratoryClass._id,
        student,
        number,
        passed: e.target.value,
      });
    } else {
      e.target.value = "-";
    }
  };

  const clearInput = (e) => {
    e.target.value = "";
  };

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
            <TableCell key={generateNotificationID()}>
              <TextField
                defaultValue={lab[0].passed}
                inputProps={{style: { textAlign: 'center' }}}
                onBlur={editLaboratoryWork(lab[0]._id, lab[0].passed)}
              />
            </TableCell>
          )
          : line.push(
            <TableCell key={generateNotificationID()}>
              <TextField
                defaultValue="-"
                inputProps={{style: { textAlign: 'center' }}}
                onBlur={setLaboratoryWork(studentId, i)}
                onFocus={clearInput}
              />
            </TableCell>
          );
      }
    }
    return line;
  };

  return (
    <Paper elevation={3} className={`${classes.root}`}>
      <Table aria-label="simple table" className={styles.laboratoryWorkTable}>
        <TableHead key="name">
          <TableCell style={{borderBottom: '1px solid #000'}}>Номер</TableCell>
          {createTableHead()}
        </TableHead>
        <TableBody>
          {laboratoryClass &&
            laboratoryClass.students &&
            laboratoryClass.students.map((item, i) => (
              <TableRow key={i}>
                <TableCell key={i} style={{ whiteSpace: 'nowrap' }}>{`${item.userId.secondName} ${item.userId.firstName[0]}.`}</TableCell>
                {createStudentLine && createStudentLine(item._id)}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default LaboratoryWork;
