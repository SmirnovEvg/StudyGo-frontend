import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from "socket.io-client";

import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';

const socket = io.connect("http://localhost:5000");

function DialogItem(props) {
    const [unreadMeassagesCount, setUnreadMeassagesCount] = useState(0)
    useEffect(() => {
        axios.get('http://localhost:3333/api/chat/message/unread', {
            params: {
                dialogId: props.dialog.id,
                partnerId: props.dialog.user._id
            }
        }).then(res => {
            setUnreadMeassagesCount(res.data)
        })

        socket.on("unread message", ({ chatMessageUser, dialogId }) => {
            if(dialogId === props.dialog.id && chatMessageUser === props.dialog.user._id){
                setUnreadMeassagesCount(unreadMeassagesCount =>  unreadMeassagesCount + 1)
            }
        });
        
    }, [props.dialog])
    return (
        <li key={props.dialog.id}>
            <Link to={`/chat/${props.dialog.id}`}>{props.dialog.user.secondName} {props.dialog.user.firstName}</Link> {unreadMeassagesCount}
        </li>
    )
}

export default withRouter(DialogItem);
DialogItem.propTypes = {
    dialog: PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            secondName: PropTypes.string.isRequired
        })
    })
}