import "./Number.sass";
import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import TableCell from "@material-ui/core/TableCell";

import "date-fns";
import Tooltip from "@material-ui/core/Tooltip";

export default function LaboratoryNumber(props) {
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const setSelected = async () => {
      if (props.date.length) {
        await setSelectedDate(props.date[0]);
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

  return (
    <TableCell key={props.number}>
      <Tooltip
        key={generateNotificationID()}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        title={
          selectedDate
            ? dateFormat(new Date(selectedDate.date), "dd / mm / yyyy")
            : ""
        }
      >
        <p>{props.number + 1}</p>
      </Tooltip>
    </TableCell>
  );
}
