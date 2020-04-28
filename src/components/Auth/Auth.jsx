import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '../Inputs/Switch/Switch';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default class Auth extends Component {
    state = {
        isRegistered: false
    }

    handleCheck = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });
    };

    render() {
        const { isRegistered } = this.state;
        return (
            <div>
                <FormControlLabel
                    control={
                        <Switch checked={isRegistered} onChange={this.handleCheck('isRegistered')} />
                    }
                    label={isRegistered ? 'Регистрация': 'Авторизация'}
                />
                {isRegistered ? (
                    <SignUp />
                ) : (
                    <SignIn />
                )}
            </div>
        )
    }
}
