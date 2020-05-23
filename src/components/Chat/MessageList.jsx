import React, { Component } from 'react';
import styles from './MessageList.module.sass'
import io from "socket.io-client";
import axios from 'axios';
import AuthService from '../../services/AuthService';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const socket = io.connect("http://localhost:5000");

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogId: "",
      chatMessageText: "",
      chatMessageUser: "",
      conversationPartnerName: "",
      conversationPartnerId: "",
      chat: [],
      width: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  

  scrollToBottom = () => {
    this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
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

    axios.put('http://localhost:3333/api/chat/message/unread', {
        dialogId: params.dialogId,
        partnerId: this.state.conversationPartnerId
    })

    this.setState({
      chat: res.data
    })

    socket.on("chat message", ({ chatMessageUser, chatMessageText, dialogId }) => {
      if (dialogId === this.state.dialogId) {
        this.setState({
          chat: [...this.state.chat, { chatMessageUser, chatMessageText }]
        });
      }
    });

    this.scrollToBottom();

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
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
    this.scrollToBottom();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  onMessageSubmit = async () => {
    const { chatMessageUser, chatMessageText, dialogId } = this.state;
    if(chatMessageText) {
      socket.emit("chat message", { chatMessageUser, chatMessageText, dialogId });
      socket.emit("unread message", { chatMessageUser, dialogId });
      this.setState({ chatMessageText: "" });

      await axios.post('http://localhost:3333/api/chat/message', {
        dialogId: dialogId,
        chatMessageText: chatMessageText,
        chatMessageTime: new Date(Date.now()),
        chatMessageUser: chatMessageUser
      })
    }
  };

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitMessage = e => {
    if(e.key === 'Enter'){
      this.onMessageSubmit()
    }
  }

  renderMessages = () => {    
    return (
      this.state.chat.map(item => (
        <div 
          key={item._id} 
          className={item.chatMessageUser === this.state.conversationPartnerId ? styles.partnerMessage : styles.myMessage}>
          {item.chatMessageUser !== this.state.conversationPartnerId && !item.isRead && <div className={styles.unreadIndicator}></div>}
          <span>{item.chatMessageText}</span>
        </div>
      ))
    )
  }

  render() {
    const { chatMessageText, conversationPartnerName, conversationPartnerId, width } = this.state;

    return (
      <div className={styles.messageList}>
        <div className={styles.dialogHeader}>
          {width <= 700 && <IconButton 
            color="default" 
            aria-label="upload picture" 
            component={Link} 
            to='/chat'
            style={{cursor: 'pointer'}}
          >
            <KeyboardBackspaceIcon />
          </IconButton>}
          <Link to={`/profile/${conversationPartnerId}`} >{conversationPartnerName}</Link>
        </div>
        <div className={styles.dialogBody}>
          <div className={styles.messageListContainer} ref={(el) => { this.messagesEnd = el; }}>
            {this.renderMessages()}
          </div>
          <div className={styles.messageInput}>
            <TextField
              id="standard-name"
              label="Сообщение"
              margin="normal"
              name="chatMessageText"
              onChange={this.onTextChange}
              onKeyPress={this.submitMessage}
              value={chatMessageText}
              style={{width: '100%'}}
              rows='2'
            />
            <label htmlFor="icon-button-file">
              <IconButton 
                color="secondary" 
                aria-label="upload picture" 
                component="span" 
                onClick={this.onMessageSubmit}
                style={{margin: '20px 0 0 10px', cursor: 'pointer'}}
              >
                <SendIcon />
              </IconButton>
            </label>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageList;