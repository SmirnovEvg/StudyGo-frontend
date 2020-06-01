import React, { Component } from 'react';
import styles from './SignIn.module.sass';
import axios from 'axios';
import Button from '../Inputs/Button/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '../Inputs/Switch/Switch';
import AuthService from '../../services/AuthService';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withRouter } from "react-router";
import { Typography } from '@material-ui/core';
import Notification from '../Inputs/Notification/Notification';

class SignIn extends Component {

    state = {
        studnumber: '',
        password: '',
        role: false,
        errorAlert: false,
    }

    closeErrorAlert = () => {
        this.setState({
            errorAlert: true
        })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value.trim() })
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
            AuthService.setTokenUser(res.data.token, res.data.authUser);
            this.props.history.push('/');
            window.location.reload(false);
        } catch (error) {
            this.setState({
                errorAlert: true
            });
            setTimeout(() => {
                this.setState({
                    errorAlert: false
                });
            }, 6000)
        }
    };

    render() {
        const { studnumber, password, role, errorAlert } = this.state;
        return (
            <div className={styles.signInForm}>
                <ValidatorForm
                    ref="form"
                    onSubmit={() => this.signIn(studnumber, password, role)}
                    onError={errors => console.log(errors)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                >
                    <div className={styles.signInFormLabel}>
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
                        value={password}
                        onChange={this.handleChange('password')}
                        validators={['required', 'minStringLength: 6']}
                        errorMessages={['Это поле обязательно', 'Пароль слишком мал']}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                    >
                        Войти
                    </Button>
                </ValidatorForm>
                <Notification alertOpen={errorAlert} type="error" text="Неверный логин или пароль"/>
            </div>
        );
    }
}

export default withRouter(SignIn);