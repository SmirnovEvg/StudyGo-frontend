import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DialogList extends Component {
    state = {
        chatMessageUser: "",
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
    renderDialogs = () => {
        return (
            this.state.dialogs.map(item => (
                <li key={item._id}>
                    <Link to={`/chat/${item._id}`}>{item._id}</Link>
                </li>
            ))
        )
    }
    render() {
        return (
            <div>
                <h1>Dialogs</h1>
                <ul>
                    {this.renderDialogs()}
                </ul>
            </div>
        )
    }
}

export default DialogList;