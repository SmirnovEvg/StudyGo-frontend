import React, { useState, useEffect } from 'react';
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Tooltip from '@material-ui/core/Tooltip';

const AddLaboratoryWork = ({ lab }) => {
    const [open, setOpen] = useState(false);
    const [descriptionText, setDescriptionText] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        setDescriptionText(lab.description)
    }, [lab])

    const editLaboratoryWork = (id, passed) => (e) => {
        if (e.target.value && e.target.value <= 10 && e.target.value > 0 && e.target.value !== passed.toString()) {
            axios.put("http://localhost:3333/api/laboratory", {
                laboratoryId: id,
                passed: e.target.value,
            });
        } else {
            e.target.value = passed;
        }
    };

    const editLaboratoryWorkVisit = (id, visit) => (e) => {
        if (e.target.value !== visit) {
            axios.put("http://localhost:3333/api/laboratory/visit", {
                laboratoryId: id,
                visit: e.target.value,
            });
        }
        else {
            e.target.value = '-';
        }
    };

    const editLaboratoryWorkDescription = (id, description) => (e) => {
        if (e.target.value !== description) {
            axios.put("http://localhost:3333/api/laboratory/description", {
                laboratoryId: id,
                description: e.target.value,
            });
        }
        else {
            e.target.value = '-';
        }
    };

    const clearInput = (e) => {
        if(e.target.value === '-'){
            e.target.value = "";
        }
      };

    const changeDescription = (e) => {
        setDescriptionText(e.target.value)
    }

    return (
        <>
            <TextField
                defaultValue={lab.passed ? lab.passed : '-'}
                inputProps={{ style: { textAlign: 'center' } }}
                onBlur={editLaboratoryWork(lab._id, lab.passed)}
                onFocus={clearInput}
            />
            <TextField
                defaultValue={lab.visit ? lab.visit : '-'}
                inputProps={{ style: { textAlign: 'center' } }}
                onBlur={editLaboratoryWorkVisit(lab._id, lab.visit)}
                onFocus={clearInput}
            />
            <Tooltip open={open} onClose={handleClose} onOpen={handleOpen} title={descriptionText}>
                <TextField
                    defaultValue={lab.description ? lab.description : '-'}
                    inputProps={{ style: { textAlign: 'center' } }}
                    onBlur={editLaboratoryWorkDescription(lab._id, lab.description)}
                    onChange={changeDescription}
                    onFocus={clearInput}
                />
            </Tooltip>
        </>
    )
}

export default AddLaboratoryWork;