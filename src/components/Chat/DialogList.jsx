import React, { Component } from 'react';
import axios from 'axios';

import DialogItem from './DialogItem';
import TextField from '@material-ui/core/TextField';

class DialogList extends Component {
    state = {
        chatMessageUser: "",
        DialogUserName: "",
        dialogs: [],
    }
    componentDidMount = async () => {
        const user = await JSON.parse(localStorage.getItem('user'));

        this.setState({
            chatMessageUser: user.userId
        })

        await axios.get('http://localhost:3333/api/chat/dialog', {
            params: {
                userId: this.state.chatMessageUser
            }
        }).then(res => {
            this.setState({
                dialogs: res.data
            })
        })
    }

    onTextChange = async e => {
        this.setState({ [e.target.name]: e.target.value });
        await axios.get('http://localhost:3333/api/chat/dialog', {
            params: {
                userId: this.state.chatMessageUser,
                dialogUserName: this.state.DialogUserName
            }
        }).then(res => {
            this.setState({
                dialogs: res.data
            })
        })
    };

    renderDialogs = () => {
        return (
            this.state.dialogs.map(item => (
                <DialogItem dialog={item} key={item._id} />
            ))
        )
    }

    render() {
        const { DialogUserName } = this.state;
        return (
            <div>
                <h1>Dialogs</h1>
                <TextField
                    id="standard-name"
                    label="Сообщение"
                    margin="normal"
                    name="DialogUserName"
                    onChange={e => this.onTextChange(e)}
                    value={DialogUserName}
                />
                <ul>
                    {this.renderDialogs()}
                </ul>
            </div>
        )
    }
}

export default DialogList;