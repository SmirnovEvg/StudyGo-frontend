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
        groupPart: '',
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
            console.log(res.data);
            switch (res.data.userId.role) {
                case 0:
                    this.setState({
                        studnumber: user.studnumber,
                        role: user.role,
                        firstName: user.firstName,
                        secondName: user.secondName,
                        thirdName: user.thirdName,
                        course: res.data.course,
                        group: res.data.group,
                        groupPart: res.data.groupPart,
                    })
                    break;

                case 1:
                    this.setState({
                        studnumber: user.studnumber,
                        role: user.role,
                        firstName: user.firstName,
                        secondName: user.secondName,
                        thirdName: user.thirdName,
                        department: res.data.teacher.department,
                        rank: res.data.teacher.rank
                    })
                    break;

                default:
                    break;
            }
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