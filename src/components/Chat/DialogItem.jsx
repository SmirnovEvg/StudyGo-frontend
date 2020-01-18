import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DialogItem extends Component {
    state = {
        firstName: '',
        secondName: ''
    }
    componentDidMount = async () => {
        const user = await JSON.parse(localStorage.getItem('user'));
        this.props.dialog.users.map((item) => {
            if (item._id !== user._id) {
                this.setState({
                    firstName: item.firstName,
                    secondName: item.secondName
                })
            }
            return null;
        })
    }
    render() {
        const { dialog } = this.props;
        const { secondName, firstName } = this.state;
        return (
            <li key={dialog._id}>
                <Link to={`/chat/${dialog._id}`}>{secondName} {firstName}</Link>
            </li>
        )
    }
}
