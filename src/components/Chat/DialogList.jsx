import React, { Component } from 'react';
import axios from 'axios';
import AuthService from '../../services/AuthService';

import DialogItem from './DialogItem';
import SearchDialogItem from './SearchDialogItem';
import TextField from '@material-ui/core/TextField';

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
            chatMessageUser: user._id
        })

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

    onTextChange = async e => {
        await this.setState({ [e.target.name]: e.target.value });

        const result = this.state.dialogs.filter(dialog => {
            return dialog.user.firstName.toLowerCase().includes(this.state.dialogUserName.toLowerCase()) || dialog.user.secondName.toLowerCase().includes(this.state.dialogUserName.toLowerCase())
        })

        if (this.state.dialogUserName) {
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
                        <li>Преподаватели</li>
                        {searchTeachers.map(item => (
                            <SearchDialogItem dialog={item} key={item._id} />
                        ))}
                    </>
                    :
                    <></>
                }
                {searchStudents.length ?
                    <>
                        <li>Студенты</li>
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
            <div>
                <h1>Dialogs</h1>
                <TextField
                    id="standard-name"
                    label="Поиск по имени"
                    margin="normal"
                    name="dialogUserName"
                    onChange={e => this.onTextChange(e)}
                    value={dialogUserName}
                />
                <ul>
                    {this.renderDialogs()}
                    {this.renderSearchList()}
                    {!searchDialogs.length && !searchStudents.length && !searchTeachers.length && dialogUserName ?
                        <li>Не найдено</li>
                        :
                        <></>
                    }
                </ul>
            </div>
        )
    }
}

export default DialogList;