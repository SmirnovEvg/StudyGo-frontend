import React, { Component } from 'react';
import axios from 'axios';

import Button from '../Inputs/Button/Button';
import AuthService from '../../services/AuthService';

export default class CreateDialog extends Component {

    onButtonSubmit = async () => {
        const user = AuthService.getUser();
        let { match: { params } } = this.props;

        console.log(new Date(Date.now()));
        console.log(user._id);
        console.log(params.partnerId);
        const res = await axios.post('http://localhost:3333/api/chat/dialog', {
            userId: user._id,
            partnerId: params.partnerId,
            createTime: new Date(Date.now())
        })

        console.log(res.data._id);
        // this.props.history.push(`/chat/${res.data._id}`);
                
    };

    render() {
        return (
            <div>
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
