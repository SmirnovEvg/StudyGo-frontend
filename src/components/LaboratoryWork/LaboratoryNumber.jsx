import './Number.sass';
import React, {useEffect} from 'react';
import axios from 'axios';
import dateFormat from 'dateformat';
import TableCell from '@material-ui/core/TableCell';

import 'date-fns';
import Tooltip from '@material-ui/core/Tooltip';

import DPDialog from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function LaboratoryNumber(props) {
    const [selectedDate, setSelectedDate] = React.useState('');
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const setSelected = async () => {
            if (props.date.length) {
                await setSelectedDate(props.date[0]);
            }
        }
        setSelected();
    }, [props])

    const generateNotificationID = () => {
        return `${(Math.random() * 1000000).toFixed(0)}${new Date().valueOf()}`;
      };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const changeDate = (date) => {
        selectedDate ? (
            axios.put('http://localhost:3333/api/laboratorytime', {
                id: selectedDate._id,
                date,
            }).then(res => {
                setSelectedDate(res.data)
            })
        ) : (
            axios.post('http://localhost:3333/api/laboratorytime', {
                laboratoryclass: props.laboratoryClass,
                number: props.number + 1,
                date,
            }).then(res => {
                setSelectedDate(res.data)
            })
        )
    }    

    return (
        <TableCell key={props.number} style={{borderBottom: '1px solid #000'}}>
            <MuiThemeProvider>
                <DPDialog
                    id="dialog"
                    ref={c => window.elem = c}
                    style={{ display: 'none' }}
                    onChange={(e, c) => changeDate(c)}
                    defaultDate={selectedDate ? new Date(selectedDate.date) : new Date()}
                    onDismiss={c => console.log('dismissed')}
                />
            </MuiThemeProvider>
                <Tooltip key={generateNotificationID()} open={open} onClose={handleClose} onOpen={handleOpen} title={selectedDate ? dateFormat(new Date(selectedDate.date), 'dd / mm / yyyy') : ''} >
                    <button className="timetable-head-number" onClick={() => window.elem.openDialog()}>{props.number + 1}</button>
                </Tooltip>
        </TableCell>
    )
}