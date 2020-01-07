import React from 'react'

export default function DialogList(props) {
const messages = props.messages.map((item, idx) => (
    <div key={idx}>
      <span style={{ color: "green" }}>{item.chatMessageUser}: </span>
      <span>{item.chatMessageText}</span>
    </div>
  ));
    return (
        <div>
            {messages}
        </div>
    )
}