import React, { Component } from "react";
import io from "socket.io-client";
import axios from 'axios';

import DialogList from './DialogList';
import MessageList from './MessageList';

const socket = io.connect("http://localhost:5000");

class Chat extends Component {
  state = {
    chatMessageText: "",
    chatMessageUser: "",
    chat: [],
    dialogs: [],
  };

  componentDidMount = async () => {
    const token = localStorage.getItem("access_token")
    await axios.get('http://localhost:3333/api/user', {
      headers: {
        Authorization: token
      }
    }
    ).then(res => {
      if (res.data.student !== undefined) {
        this.setState({
          chatMessageUser: res.data.student.userId._id,
        })
      } else {
        this.setState({
          chatMessageUser: res.data.teacher.userId._id,
        })
      }
    })
      .catch(err => {
        console.log(err);
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

    await axios.get('http://localhost:3333/api/chat/message', {
      params: {
        dialogId: "5e11e6da85a5750ddcda56a9"
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
    console.log(this.state.dialogs);

  };

  onMessageSubmit = async () => {
    const { chatMessageUser, chatMessageText } = this.state;
    socket.emit("chat message", { chatMessageUser, chatMessageText });
    this.setState({ chatMessageText: "" });

    await axios.post('http://localhost:3333/api/chat/message', {
      dialogId: "5e11e6da85a5750ddcda56a9",
      chatMessageText: chatMessageText,
      chatMessageTime: new Date(Date.now()),
      chatMessageUser: chatMessageUser
    })
  };

  render() {
    const { dialogs, chatMessageText, chat } = this.state
    return (
      <div>
        <span>Dialogs</span>
        <DialogList dialogs={dialogs} />
        <span>Message</span>
        <MessageList messages={chat}/>
        <input
          name="chatMessageText"
          onChange={e => this.onTextChange(e)}
          value={chatMessageText}
        />
        <button onClick={() => this.onMessageSubmit()}>Send</button>
      </div>
    );
  }
}

export default Chat;
