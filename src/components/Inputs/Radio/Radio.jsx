import React from 'react';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    radio: {
    '&$checked': {
      color: '#000'
    }
  },
}));

export default function RadioButtons(props) {
    const classes = useStyles();
    return (
        <div>
            <Radio
                {...props}
                className={classes.radio}                
            />
        </div>
    );
}