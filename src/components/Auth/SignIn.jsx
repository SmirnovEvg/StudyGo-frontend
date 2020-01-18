import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '../Inputs/Button/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '../Inputs/Switch/Switch';

class SignIn extends Component {
    state = {
        studnumber: '',
        password: '',
        role: false
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleCheck = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });
    };

    signIn = async (studnumber, password, role) => {
        try {
            const res = await axios.post(
                "http://localhost:3333/api/auth/login",
                {
                    studnumber: studnumber,
                    password: password,
                    role: role ? 1 : 0
                }
            );
            localStorage.setItem('access_token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
        } catch (error) {
            console.log(error);
        }
    };

    signOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    }

    render() {
        const { studnumber, password, role } = this.state;
        return (
            <div className="App">
                <form className="" noValidate autoComplete="off">
                    <FormControlLabel
                        control={
                            <Switch checked={role} onChange={this.handleCheck('role')} value="role" />
                        }
                        label="Роль"
                    />
                    <TextField
                        id="standard-name"
                        label="Студенческий"
                        onChange={this.handleChange('studnumber')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-password-input"
                        label="Пароль"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange={this.handleChange('password')}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.signIn(studnumber, password, role)}
                    >
                        Войти
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.signOut}
                    >
                        Выйти
                    </Button>
                </form>
            </div>
        );
    }
}

export default SignIn;