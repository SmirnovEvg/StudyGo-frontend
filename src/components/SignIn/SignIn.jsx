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
            await axios.post('http://localhost:3333/api/user/login', {
                studnumber: studnumber,
                password: password,
                role: role ? 1 : 0
            }).then(res => {
                console.log(res.data.token);
                localStorage.setItem('access_token', res.data.token);
            })
        } catch (error) {
            console.log(error);
        }
    }

    signOut = async () => {
        try {
            localStorage.removeItem('access_token');
        }
        catch (err) {
            console.log(err);

        }
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
                        onClick={() => this.signOut()}
                    >
                        Выйти
                    </Button>
                </form>
            </div>
        );
    }
}

export default SignIn;