import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DialogItem.module.sass';
import io from "socket.io-client";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';

const socket = io.connect("http://localhost:5000");

function DialogItem(props) {
    const dialogId = props.location.pathname.split('/')[2];

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
            if (dialogId === props.dialog.id && chatMessageUser === props.dialog.user._id) {
                setUnreadMeassagesCount(unreadMeassagesCount => unreadMeassagesCount + 1)
            }
        });

    }, [props.dialog])

    return (
        <ListItem
            component={Link}
            to={`/chat/${props.dialog.id}`}
            key={props.dialog.id}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 5px',
                color: '#707070',
                borderBottom: '1px solid #B7B7B7',
                width: '100%',
                backgroundColor: `${dialogId === props.dialog.id ? '#F3F3F3' : 'white'}`,
                className: styles.dialogItem
            }}
        >
            <div className={styles.partnerName}>
                {props.dialog.user.secondName} {props.dialog.user.firstName}
            </div>
            {unreadMeassagesCount ? (<div className={styles.partnerUnreadMessages}>
                {unreadMeassagesCount}
            </div>) : (<></>)}
        </ListItem>
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