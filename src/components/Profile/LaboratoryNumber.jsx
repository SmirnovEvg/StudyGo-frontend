import styles from "./Number.module.sass"
import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import TableCell from "@material-ui/core/TableCell";

import "date-fns";
import Tooltip from "@material-ui/core/Tooltip";

export default function LaboratoryNumber(props) {
  const [selectedDate, setSelectedDate] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const setSelected = async () => {
      if (props.date.length) {
        await setSelectedDate(props.date[0].date);
        await setName(props.date[0].name);
      }
    };
    setSelected();
  }, [props]);

  const generateNotificationID = () => {
    return `${(Math.random() * 1000000).toFixed(0)}${new Date().valueOf()}`;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const titleText = (date, name) => {
    if (date && !name) {
        return <p style={{ padding: 0, margin: 0 }}>{dateFormat(new Date(selectedDate), 'dd / mm / yyyy')}</p>;
    }
    else if (!date && name) {
        return <p style={{ padding: 0, margin: 0 }}>{name}</p>;
    }
    else if (date && name) {
        return <p style={{ padding: 0, margin: 0 }}>{dateFormat(new Date(selectedDate), 'dd / mm / yyyy')} <br /> {name}</p>;
    }
    else {
        return '';
    }
}

  return (
    <TableCell key={props.number} className={styles.timetableHeadNumber} style={{borderBottom: '1px solid #000'}}>
      <Tooltip
        key={generateNotificationID()}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        title={
          titleText(selectedDate, name)
        }
      >
        <p>{props.number + 1}</p>
      </Tooltip>
    </TableCell>
  );
}
