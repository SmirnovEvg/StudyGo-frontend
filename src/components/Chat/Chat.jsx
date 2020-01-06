import React, { Component } from "react";
import io from "socket.io-client";
import axios from 'axios';

const socket = io.connect("http://localhost:5000");

class Chat extends Component {
  state = {
    chatMessageText: "",
    chat: [],
    chatMessageUser: ""
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

    socket.on("chat message", ({ chatMessageUser, chatMessageText }) => {
      this.setState({
        chat: [...this.state.chat, { chatMessageUser, chatMessageText }]
      });
    });

    await axios.post('http://localhost:3333/api/chat/getMessages', {
      dialogId: "5e11e6da85a5750ddcda56a9"
    }).then(messages => {
      this.setState({
        chat: messages.data
      })
    })
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
    }).then(res => {
      res.status(200).send("Success")
    })
  };

  renderChat() {
    const { chat } = this.state;
    return chat.map(({ chatMessageUser, chatMessageText }, idx) => (
      <div key={idx}>
        <span style={{ color: "green" }}>{chatMessageUser}: </span>
        <span>{chatMessageText}</span>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <span>Message</span>
        <input
          name="chatMessageText"
          onChange={e => this.onTextChange(e)}
          value={this.state.chatMessageText}
        />
        <button onClick={() => this.onMessageSubmit()}>Send</button>
        <div>{this.renderChat()}</div>
      </div>
    );
  }
}

export default Chat;
