import React, { Component } from 'react';
import axios from 'axios';
import AuthService from '../../services/AuthService';

import DialogItem from './DialogItem';
import TextField from '@material-ui/core/TextField';

class DialogList extends Component {
    state = {
        chatMessageUser: "",
        dialogUserName: "",
        dialogs: [],
        searchDialogs: []
    }
    componentDidMount = async () => {
        const user = await AuthService.getUser();

        this.setState({
            chatMessageUser: user._id
        })

        const res = await axios.get('http://localhost:3333/api/chat/dialog', {
            params: {
                userId: this.state.chatMessageUser
            }
        })

        this.setState({
            dialogs: res.data
        })
    }

    onTextChange = async e => {
        await this.setState({ [e.target.name]: e.target.value });

        const result = this.state.dialogs.filter(dialog => {
            return dialog.user.firstName.toLowerCase().includes(this.state.dialogUserName.toLowerCase()) || dialog.user.secondName.toLowerCase().includes(this.state.dialogUserName.toLowerCase())
        })

        this.setState({ searchDialogs: result });
    };

    renderDialogs = () => {
        const { searchDialogs, dialogUserName, dialogs } = this.state
        let dialogList;
        if (searchDialogs.length) {
            dialogList = this.state.searchDialogs.map(item => (
                <DialogItem dialog={item} key={item.id} />
            ))
        }
        else if (dialogUserName && !searchDialogs.length) {
            dialogList = <li>not found</li>
        }
        else {
            dialogList = dialogs.map(item => (
                <DialogItem dialog={item} key={item.id} />
            ))
        }
        return (
            <>
                {dialogList}
            </>
        )
    }

    render() {
        const { dialogUserName } = this.state;
        return (
            <div>
                <h1>Dialogs</h1>
                <TextField
                    id="standard-name"
                    label="Сообщение"
                    margin="normal"
                    name="dialogUserName"
                    onChange={e => this.onTextChange(e)}
                    value={dialogUserName}
                />
                <ul>
                    {this.renderDialogs()}
                </ul>
            </div>
        )
    }
}

export default DialogList;