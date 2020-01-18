import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '../Inputs/Button/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '../Inputs/Switch/Switch';

class SignUp extends Component {
    state = {
        studnumber: '',
        password: '',
        confirmPassword: '',
        role : false
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleCheck = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });       
    };

    signUp = async (studnumber, password, confirmPassword, role) => {
        try {
            const res = await axios.post('http://localhost:3333/api/auth/register', {
                studnumber: studnumber,
                password: password,
                confirmPassword: confirmPassword,
                role: role ? 1 : 0
            })
                localStorage.setItem('access_token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.newUser))
        } catch (error) {
            console.log(error);
        }        
    }

    render() {
        const{ studnumber, password, confirmPassword, role } = this.state;
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
                    <TextField
                        id="standard-confirm-password-input"
                        label="Подтвердите пароль"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange={this.handleChange('confirmPassword')}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.signUp(studnumber, password, confirmPassword, role)}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
        );
    }
}

export default SignUp;