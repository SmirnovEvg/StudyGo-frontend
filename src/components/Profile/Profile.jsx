import React, { Component } from 'react';
import axios from 'axios';

export default class Profile extends Component {
    state = {
        isLoading: false,
        isLoggined: false,
        studnumber: '',
        firstName: '',
        secondName: ''
    }
    componentDidMount = async () => {
        const token = localStorage.getItem("access_token")
        await axios.get('http://localhost:3333/api/user', {
            headers: {
                Authorization: token
            }
        }
        ).then(res => {
            this.setState({
                isLoading: true,
                isLoggined: true,
                studnumber: res.data.student.userId.studnumber,
                firstName: res.data.student.firstName,
                secondName: res.data.student.secondName,
            })
        })
            .catch(err => {
                console.log(err);
                this.setState({
                    isLoading: true,
                    isLoggined: false
                })
            })
        console.log(this.state.user);

    }

    render() {
        const { studnumber, firstName, secondName } = this.state;
        return (
            <div>
                <p>{studnumber}</p>
                <p>{firstName}</p>
                <p>{secondName}</p>
            </div>
        )
    }
}
