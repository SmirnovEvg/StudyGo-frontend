import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class DialogItem extends Component {
    state = {
        user: '',
        firstName: '',
        secondName: ''
    }
    componentDidMount = async () => {
        const user = await JSON.parse(localStorage.getItem('user'));
        this.props.dialog.users.map((item) => {
            if (item !== user.userId) {
                this.setState({ user: item })
            }
            return null;  //не понял ниче
        })

        await axios.get('http://localhost:3333/api/user/dialog', {
            params: {
                _id: this.state.user
            }
        }).then(user => {
            this.setState({
                firstName: user.student ? user.data.student.firstName : user.data.teacher.firstName,
                secondName: user.student ? user.data.student.secondName : user.data.teacher.secondName,
            })
        })
    }
    render() {
        const { firstName, secondName } = this.state;
        const { dialog } = this.props;
        return (
            <li key={dialog._id}>
                <Link to={`/chat/${dialog._id}`}>{firstName} {secondName}</Link>
            </li>
        )
    }
}
