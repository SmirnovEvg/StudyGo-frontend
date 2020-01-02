
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        backgroundColor: "#f00"
    },
    input: {
        display: 'none',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));



export const MaterialButton = (props) => {
    const classes = useStyles();
    return (<div>
        <Button
            {...props}
            className={classes.button}
        /></div>)
}

export default MaterialButton;