import React, { Component } from 'react';
import io from "socket.io-client";
import axios from 'axios';
import AuthService from '../../services/AuthService';
import TextField from '@material-ui/core/TextField';
import Button from '../Inputs/Button/Button';
import { Link } from 'react-router-dom';

const socket = io.connect("http://localhost:5000");

class MessageList extends Component {
  state = {
    dialogId: "",
    chatMessageText: "",
    chatMessageUser: "",
    conversationPartnerName: "",
    chat: [],
  }

  componentDidMount = async () => {    
    const user = await AuthService.getUser();

    let { match: { params } } = this.props;

    const partner = await axios.get('http://localhost:3333/api/chat/partner', {
      params: {
        userId: user._id,
        dialogId: params.dialogId
      }
    })

    this.setState({
      chatMessageUser: user._id,
      dialogId: params.dialogId,
      conversationPartnerName: `${partner.data.firstName} ${partner.data.secondName}`,
      conversationPartnerId: partner.data._id
    })

    const res = await axios.get('http://localhost:3333/api/chat/message', {
      params: {
        dialogId: params.dialogId
      }
    })
    this.setState({
      chat: res.data
    })

    socket.on("chat message", ({ chatMessageUser, chatMessageText }) => {
      this.setState({
        chat: [...this.state.chat, { chatMessageUser, chatMessageText }]
      });
    });
  }

  componentDidUpdate = async () => {
    const { match: { params } } = this.props;

    if (params.dialogId !== this.state.dialogId) {
      const partner = await axios.get('http://localhost:3333/api/chat/partner', {
        params: {
          userId: this.state.chatMessageUser,
          dialogId: params.dialogId
        }
      })

      this.setState({
        dialogId: params.dialogId,
        conversationPartnerName: `${partner.data.secondName} ${partner.data.firstName}`,
        conversationPartnerId: partner.data._id
      })

      const res = await axios.get('http://localhost:3333/api/chat/message', {
        params: {
          dialogId: params.dialogId
        }
      })
      this.setState({
        chat: res.data
      })
    }
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
    const { chatMessageText, conversationPartnerName, conversationPartnerId } = this.state
    return (
      <div>
        <Link to={`/profile/${conversationPartnerId}`} >{conversationPartnerName}</Link>
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
          onClick={this.onMessageSubmit}
        >
          Отправить
        </Button>
      </div>
    )
  }
}

export default MessageList;