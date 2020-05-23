import React, { Component } from 'react';
import styles from './DialogList.module.sass';
import axios from 'axios';
import AuthService from '../../services/AuthService';

import DialogItem from './DialogItem';
import SearchDialogItem from './SearchDialogItem';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';

class DialogList extends Component {
    state = {
        chatMessageUser: "",
        dialogUserName: "",
        dialogs: [],
        searchDialogs: [],
        partners: [],
        searchStudents: [],
        searchTeachers: []
    }
    componentDidMount = async () => {        
        const user = await AuthService.getUser();

        this.setState({
            chatMessageUser: user && user._id
        })
        
        if (this.state.chatMessageUser) {
            const res = await axios.get('http://localhost:3333/api/chat/dialog', {
                params: {
                    userId: this.state.chatMessageUser
                }
            })

            res.data.partnerIds.push({ id: user._id })

            this.setState({
                dialogs: res.data.dialog,
                partners: res.data.partnerIds
            })
        }
    }

    onTextChange = async e => {
        await this.setState({ [e.target.name]: e.target.value });

        const result = this.state.dialogs.filter(dialog => {
            return dialog.user.firstName.toLowerCase().includes(this.state.dialogUserName.toLowerCase()) || dialog.user.secondName.toLowerCase().includes(this.state.dialogUserName.toLowerCase())
        })

        if (this.state.dialogUserName && this.state.partners) {
            const res = await axios.get('http://localhost:3333/api/chat/users', {
                params: {
                    searchText: this.state.dialogUserName,
                    partners: this.state.partners
                }
            })
            this.setState({
                searchStudents: res.data.searchStudentList,
                searchTeachers: res.data.searchTeacherList,
            });
        }
        else {
            this.setState({
                searchStudents: [],
                searchTeachers: []
            });
        }

        this.setState({
            searchDialogs: result,
        });
    };

    renderDialogs = () => {
        const { searchDialogs, dialogUserName, dialogs } = this.state
        let dialogList;

        if (searchDialogs.length) {
            dialogList = searchDialogs.map(item => (
                <DialogItem dialog={item} key={item.id} />
            ));
        }
        else if (dialogUserName && !searchDialogs.length) {
            dialogList = <></>
        }
        else {
            dialogList = dialogs.map(item => (
                <DialogItem dialog={item} key={item.id} />
            ))
        }
        return (
            <>
                {dialogList}
            </>
        )
    }

    renderSearchList = () => {
        const { searchStudents, searchTeachers } = this.state
        return (
            <>
                {searchTeachers.length ?
                    <>
                        <li className={styles.labelText}>Преподаватели</li>
                        {searchTeachers.map(item => (
                            <SearchDialogItem dialog={item} key={item._id} />
                        ))}
                    </>
                    :
                    <></>
                }
                {searchStudents.length ?
                    <>
                        <li className={styles.labelText}>Студенты</li>
                        {searchStudents.map(item => (
                            <SearchDialogItem dialog={item} key={item._id} />
                        ))}
                    </>
                    :
                    <></>
                }
            </>
        )
    }

    render() {
        const { dialogUserName, searchDialogs, searchStudents, searchTeachers } = this.state;
        return (
            <div className={styles.dialogList}>
                <h3>Диалоги</h3>
                <TextField
                    id="standard-name"
                    label="Поиск"
                    margin="normal"
                    name="dialogUserName"
                    onChange={e => this.onTextChange(e)}
                    value={dialogUserName}
                    style={{width: '100%'}}
                />
                <List component="nav" aria-label="secondary mailbox folder">
                    {this.renderDialogs()}
                    {this.renderSearchList()}
                    {!searchDialogs.length && !searchStudents.length && !searchTeachers.length && dialogUserName ?
                        <li className={styles.labelText}>Не найдено</li>
                        :
                        <></>
                    }
                </List>
            </div>
        )
    }
}

export default DialogList;