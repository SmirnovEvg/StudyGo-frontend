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
import EditLaboratoryWork from "./EditLaboratoryWork";


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
  const [isPassed, setIsPassed] = useState(false);

  let {
    match: { params },
  } = props;

  useEffect(() => {
    const getLabs = async () => {
      if (params.laboratoryId) {
        try {
          const labClass = await axios.get(
            "http://localhost:3333/api/laboratoryclass/",
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

          const lab = await axios.get("http://localhost:3333/api/laboratory/", {
            params: {
              laboratoryClass: params.laboratoryId,
            },
          });
          setLaboratoryWorks(lab.data);

          const labTime = await axios.get(
            "http://localhost:3333/api/laboratorytime/",
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
  }, [isPassed, params.laboratoryId]);

  const setLaboratoryWork = (student, number) => (e) => {
    if (e.target.value && e.target.value <= 10 && e.target.value > 0) {
      axios.post("http://localhost:3333/api/laboratory", {
        laboratoryclass: laboratoryClass._id,
        student,
        number,
        passed: e.target.value,
        visit: '',
        description: '',
      });
      setIsPassed(!isPassed);
    } else {
      e.target.value = "-";
    }
  };

  const setLaboratoryWorkVisit = (student, number) => (e) => {
    if (e.target.value) {
      axios.post("http://localhost:3333/api/laboratory/visit", {
        laboratoryclass: laboratoryClass._id,
        student,
        number,
        passed: '',
        visit: e.target.value,
        description: '',
      });
      setIsPassed(!isPassed);
    } else {
      e.target.value = "-";
    }
  };

  const setLaboratoryWorkDescription = (student, number) => (e) => {
    if (e.target.value) {
      axios.post("http://localhost:3333/api/laboratory/description", {
        laboratoryclass: laboratoryClass._id,
        student,
        number,
        passed: '',
        visit: '',
        description: e.target.value,
      });
      setIsPassed(!isPassed);
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
              <EditLaboratoryWork lab={lab[0]} clearInput={clearInput} />
            </TableCell>
          )
          : line.push(
            <TableCell key={generateNotificationID()}>
              <TextField
                defaultValue="-"
                inputProps={{ style: { textAlign: 'center' } }}
                onBlur={setLaboratoryWork(studentId, i)}
                onFocus={clearInput}
              />
              <TextField
                defaultValue="-"
                inputProps={{ style: { textAlign: 'center' } }}
                onBlur={setLaboratoryWorkVisit(studentId, i)}
                onFocus={clearInput}
              />
              <TextField
                defaultValue="-"
                inputProps={{ style: { textAlign: 'center' } }}
                onBlur={setLaboratoryWorkDescription(studentId, i)}
                onFocus={clearInput}
              />
            </TableCell>
          );
      }
      let labList = laboratoryWorks.filter((item) => {
        return item.student._id === studentId && item.number !== 0 && item.passed !== 0;
      });
      const visitCount = laboratoryWorks.filter((item) => {
        return item.student._id === studentId && item.visit;
      }).length;
      let labSum = 0;
      for (let j = 0; j < labList.length; j++) {
        labSum += labList[j].passed;
      }
      const labAverage = labSum / labList.length;
      line.push(
        <TableCell key={generateNotificationID()} style={{ verticalAlign: 'top' }}>
          <p>
            {labAverage ? labAverage.toFixed(1) : 0}
          </p>
          <p>
            {visitCount ? visitCount : 0}
          </p>
        </TableCell>
      )

    }
    return line;
  };

  return (
    <Paper elevation={3} className={`${classes.root}`}>
      <Table aria-label="simple table" className={styles.laboratoryWorkTable}>
        <TableHead key="name">
          <TableCell style={{ borderBottom: '1px solid #000' }}>Номер</TableCell>
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
