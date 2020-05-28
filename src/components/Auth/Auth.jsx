import React, { Component } from 'react';
import styles from './Auth.module.sass';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '../Inputs/Switch/Switch';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import { ReactComponent as FITLogo } from "../../static/images/FITLogo.svg";

const style = theme => ({
    formControlLabel: {
        margin: theme.spacing(1),
        minWidth: 120,
        left: '-80px'
    }
});

class Auth extends Component {
    state = {
        isRegistered: false
    }

    handleCheck = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });
    };

    render() {
        const { isRegistered } = this.state;
        return (
            <div className={styles.authForm}>
                <FITLogo />
                <Paper elevation={3} className={styles.authFormContainer}>
                    <FormControlLabel
                        control={
                            <Switch checked={isRegistered} onChange={this.handleCheck('isRegistered')} />
                        }
                        label={<Typography style={{ color: '#666', fontWeight: 600, fontSize: '30px' }}>{isRegistered ? 'Регистрация' : 'Авторизация'}</Typography>}
                        style={styles.authFormLabel}
                    />
                    <div className={styles.authFormBody}>
                        {isRegistered ? (
                            <SignUp />
                        ) : (
                                <SignIn />
                            )}
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withStyles(style, { withTheme: true })(Auth);