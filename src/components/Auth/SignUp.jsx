import React, { Component } from 'react';
import axios from 'axios';
import Button from '../Inputs/Button/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '../Inputs/Switch/Switch';
import AuthService from '../../services/AuthService';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styles from './SignUp.module.sass';
import { Typography } from '@material-ui/core';

class SignUp extends Component {
    state = {
        studnumber: '',
        password: '',
        confirmPassword: '',
        role: false
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }

    componentWillUnmount() {
        ValidatorForm.removeValidationRule('isPasswordMatch');
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value.trim() })
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
            AuthService.setTokenUser(res.data.token, res.data.user);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { studnumber, password, confirmPassword, role } = this.state;
        return (
            <div className={styles.signUpForm}>
                <ValidatorForm
                    onSubmit={() => this.signUp(studnumber, password, confirmPassword, role)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                >
                    <div className={styles.signUpFormLabel}>
                        <FormControlLabel
                            control={
                                <Switch checked={role} onChange={this.handleCheck('role')} value="role" />
                            }
                            label={<Typography style={{ color: '#666', fontWeight: 200, fontSize: '20px' }}>{role ? 'Преподаватель' : 'Студент'}</Typography>}
                        />
                    </div>
                    <TextValidator
                        id="standard-name"
                        label="Студенческий"
                        onChange={this.handleChange('studnumber')}
                        margin="normal"
                        value={studnumber}
                        validators={['required', 'isNumber', 'minNumber: 10000000', 'maxNumber: 99999999']}
                        errorMessages={['Это поле обязательно', 'Некорректное число', 'Некорректное число', 'Некорректное число']}
                    />
                    <TextValidator
                        id="standard-password-input"
                        label="Пароль"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange={this.handleChange('password')}
                        value={password}
                        validators={['required', 'minStringLength: 6']}
                        errorMessages={['Это поле обязательно', 'Пароль слишком мал']}
                    />
                    <TextValidator
                        id="standard-confirm-password-input"
                        label="Подтвердите пароль"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange={this.handleChange('confirmPassword')}
                        value={confirmPassword}
                        validators={['required', 'isPasswordMatch']}
                        errorMessages={['Это поле обязательно', 'Пароли не совпадают']}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                    >
                        Зарегистрироваться
                    </Button>
                </ValidatorForm>
            </div >
        );
    }
}

export default SignUp;