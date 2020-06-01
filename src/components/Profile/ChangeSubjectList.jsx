import React, { useState, useEffect } from "react";
import axios from "axios";

import AuthService from "../../services/AuthService";

import {
    ValidatorForm,
    SelectValidator,
} from "react-material-ui-form-validator";
import Button from "../Inputs/Button/Button";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: theme.spacing(0.5),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function AddAdditionalForm(props) {
    const classes = useStyles();
    const [subject, setSubject] = useState("");
    const [subjectList, setSubjectList] = useState("");
    const [groups, setGroup] = useState([]);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setGroup(props.subjects);
        setSubjectList(props.subjectList);
    }, [props.subjectList, props.subjects])

    const handleDelete = (chipToDelete) => async () => {
        setGroup((chips) => chips.filter((chip) => chip._id !== chipToDelete))
    };

    const addGroup = (e) => {
        const subjectValue = _.findIndex(subjectList, (subj) => subj._id === e.target.value);
        if (!groups.includes(subjectList[subjectValue])) {
            setGroup(groups.concat(subjectList[subjectValue]));
            setSubject("");
        } else {
            setSubject("");
        }
    };

    const createNewAdditional = async () => {
        if (groups.length) {
            await axios
                .put("http://localhost:3333/api/user/teacher", {
                    teacherId: AuthService.getUser()._id,
                    subjects: groups,
                })
                .then((res) => {
                    console.log(res);
                    
                });
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div id="addForm">
            <Button variant="contained" color="secondary" onClick={handleClickOpen} style={{ marginLeft: 0 }}>
                Изменить список дисциплин
      </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Список дисциплин"}</DialogTitle>
                <ValidatorForm
                    onSubmit={() => createNewAdditional()}
                    onError={(errors) => console.log(errors)}
                >
                    <DialogContent>
                        <Paper className={classes.root}>
                            {groups.map((item) => {
                                return (
                                    <Chip
                                        key={item._id}
                                        label={item.name}
                                        onDelete={handleDelete(item._id)}
                                        className={classes.chip}
                                    />
                                );
                            })}
                        </Paper>
                        <FormControl className={classes.formControl}>
                            <SelectValidator
                                label="Предмет"
                                id="demo-simple-select"
                                value={subject}
                                onChange={addGroup}
                            >
                                {subjectList &&
                                    subjectList.map((item, index) => {
                                        return (
                                            <MenuItem key={item._id} value={item._id} name={item.name}>
                                                {item.name}
                                            </MenuItem>
                                        );
                                    })}
                            </SelectValidator>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="secondary">
                            Отмена
            </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            autoFocus
                        >
                            Изменить
            </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}
