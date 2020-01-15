import React, { Component } from 'react';
import io from "socket.io-client";
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '../Inputs/Button/Button';

const socket = io.connect("http://localhost:5000");

class MessageList extends Component {
  state = {
    dialogId: "",
    chatMessageText: "",
    chatMessageUser: "",
    chat: [],
  }

  componentDidUpdate = async () => {
    let { match: { params } } = this.props;

    if (params.dialogId !== this.state.dialogId) {
      this.setState({
        dialogId: params.dialogId
      })

      await axios.get('http://localhost:3333/api/chat/message', {
        params: {
          dialogId: params.dialogId
        }
      }).then(res => {
        this.setState({
          chat: res.data
        })
      })
    }
    else {
      return null;
    }
  }

  componentDidMount = async () => {
    const user = await JSON.parse(localStorage.getItem('user'));
    let { match: { params } } = this.props;

    this.setState({
      chatMessageUser: user.userId,
      dialogId: params.dialogId
    })

    await axios.get('http://localhost:3333/api/chat/message', {
      params: {
        dialogId: params.dialogId
      }
    }).then(res => {
      this.setState({
        chat: res.data
      })
    })

    socket.on("chat message", ({ chatMessageUser, chatMessageText }) => {
      this.setState({
        chat: [...this.state.chat, { chatMessageUser, chatMessageText }]
      });
    });
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onMessageSubmit = async () => {
    const { chatMessageUser, chatMessageText, dialogId } = this.state;
    socket.emit("chat message", { chatMessageUser, chatMessageText });
    this.setState({ chatMessageText: "" });

    await axios.post('http://localhost:3333/api/chat/message', {
      dialogId: dialogId,
      chatMessageText: chatMessageText,
      chatMessageTime: new Date(Date.now()),
      chatMessageUser: chatMessageUser
    })
  };

  renderMessages = () => {
    return (
      this.state.chat.map((item, idx) => (
        <div key={idx}>
          <span style={{ color: "green" }}>{item.chatMessageUser}: </span>
          <span>{item.chatMessageText}</span>
        </div>
      ))
    )
  }
  render() {
    const { chatMessageText } = this.state
    return (
      <div>
        <h1>Messages</h1>
        <div>
          {this.renderMessages()}
        </div>
        <TextField
          id="standard-name"
          label="Сообщение"
          margin="normal"
          name="chatMessageText"
          onChange={e => this.onTextChange(e)}
          value={chatMessageText}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.onMessageSubmit()}
        >
          Отправить
        </Button>
      </div>
    )
  }
}

export default MessageList;