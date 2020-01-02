import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
    switchBase: {
        color: "#f00",
        '&$checked': {
            color: "#f00",
        },
        '&$checked + $track': {
            backgroundColor: "#f00",
        },
    },
    checked: {},
    track: {},
}));



export const MaterialSwitch = (props) => {
    const classes = useStyles();
    return (<div>
        <Switch
            {...props}
            classes={{
                switchBase: classes.switchBase,
                track: classes.track,
                checked: classes.checked,
            }}
        /></div>)
}

export default MaterialSwitch;