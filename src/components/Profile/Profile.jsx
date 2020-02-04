import React, { Component } from 'react';
import axios from 'axios';
import userIsAuthenticatedRedirect from '../wrappers/userIsAuthenticatedRedirect';
import AuthService from '../../services/AuthService';

import StudentProfile from './StudentProfile';
import TeacherProfile from './TeacherProfile';

class Profile extends Component {
    state = {
        studnumber: '',
        firstName: '',
        secondName: '',
        thirdName: '',
        role: '',
        course: '',
        group: '',
        department: '',
        rank: '',
    }
    componentDidMount = async () => {
        try {
            const token = AuthService.getToken();
            const user = AuthService.getUser();

            const res = await axios.get('http://localhost:3333/api/user', {
                headers: {
                    Authorization: token
                }
            })
            res.data.student ?
                this.setState({
                    studnumber: user.studnumber,
                    role: user.role,
                    firstName: user.firstName,
                    secondName: user.secondName,
                    thirdName: user.thirdName,
                    course: res.data.student.course,
                    group: res.data.student.group
                })
                :
                this.setState({
                    studnumber: user.studnumber,
                    role: user.role,
                    firstName: user.firstName,
                    secondName: user.secondName,
                    thirdName: user.thirdName,
                    department: res.data.teacher.department,
                    rank: res.data.teacher.rank
                })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { role } = this.state;
        return (
            <div>
                {role ? (
                    <TeacherProfile
                        {...this.state}
                    />
                ) : (
                        <StudentProfile
                            {...this.state}
                        />
                    )}
            </div>
        )
    }
}

export default userIsAuthenticatedRedirect(Profile);