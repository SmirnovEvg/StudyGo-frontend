import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Unauthenticated.module.sass';
import { ReactComponent as FITLogo } from "../../static/images/FITLogo.svg";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { transparent } from 'material-ui/styles/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: '4px 8px',
        },
        borderColor: '#ff0000',
        color: '#ff0000',
        '&:hover': {
            backgroundColor: transparent,
            borderColor: '#ff0000',
          },
    },
}));

export default function Unauthenticated() {
    const classes = useStyles();
    return (
        <div className={styles.notFoundPage}>
            <FITLogo />
            <h2>Упс!</h2>
            <p>Не авторизован.</p>
            <Button
                className={classes.root}
                variant="outlined" 
                color="secondary"
                component={Link}
                to='/auth'
            >
                Авторизоваться
            </Button>
        </div>
    )
}