import React, { Component } from 'react';
import axios from 'axios';

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
        const user = await JSON.parse(localStorage.getItem('user'));

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

        let result = []
        if (this.state.dialogUserName.length !== 0) {
            this.state.dialogs.find(dialog => {
                dialog.users.find(user => {
                    if ((user._id !== this.state.chatMessageUser) &&
                        (user.firstName.toLowerCase().includes(this.state.dialogUserName.toLowerCase())
                            || user.secondName.toLowerCase().includes(this.state.dialogUserName.toLowerCase()))) {
                        result.push(dialog);
                    }
                })
            })
        }
        console.log(result);
        this.setState({ searchDialogs: result ? result : this.state.dialogs });
    };

    renderDialogs = () => {
        return (
            this.state.searchDialogs.length ? (
                this.state.searchDialogs.map(item => (
                    <DialogItem dialog={item} key={item._id} />
                ))
            ) : (
                    this.state.dialogs.map(item => (
                        <DialogItem dialog={item} key={item._id} />
                    ))
                )
        )
        // если массив пуст но в поле введено
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