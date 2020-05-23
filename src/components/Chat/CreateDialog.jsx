import React, { Component } from 'react';
import axios from 'axios';

import styles from './CreateDialog.module.sass';
import { ReactComponent as FITLogo } from "../../static/images/FITLogo.svg";

import Button from '../Inputs/Button/Button';
import AuthService from '../../services/AuthService';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

export default class CreateDialog extends Component {
    constructor(props) {
    super(props);
    this.state = {
      width: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount = async () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
    onButtonSubmit = async () => {
        const user = AuthService.getUser();
        let { match: { params } } = this.props;

        const res = await axios.post('http://localhost:3333/api/chat/dialog', {
            userId: user._id,
            partnerId: params.partnerId,
            createTime: new Date(Date.now())
        })
        this.props.history.push(`/chat/${res.data._id}`);      
    };

    render() {   
        const { width } = this.state;
        return (
            <div className={styles.createDialogContainer}>
                {width <= 700 && <IconButton 
                color="default" 
                aria-label="upload picture" 
                component={Link} 
                to='/chat'
                style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '10px',
                    left: 0
                }}
            >
                <KeyboardBackspaceIcon />
            </IconButton>}
                <FITLogo className={styles.fitImage}/>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.onButtonSubmit}
                >
                    Создать диалог
                </Button>
            </div>
        )
    }
}
