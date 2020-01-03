import React, { Component } from 'react';
import axios from 'axios';
import userIsAuthenticatedRedirect from '../../wrappers/userIsAuthenticatedRedirect';

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
        const token = localStorage.getItem("access_token")
        await axios.get('http://localhost:3333/api/user', {
            headers: {
                Authorization: token
            }
        }
        ).then(res => {
            if (res.data.student !== undefined) {
                this.setState({
                    studnumber: res.data.student.userId.studnumber,
                    role: res.data.student.userId.role,
                    firstName: res.data.student.firstName,
                    secondName: res.data.student.secondName,
                    course: res.data.student.course,
                    group: res.data.student.group
                })
            } else {
                this.setState({
                    studnumber: res.data.teacher.userId.studnumber,
                    role: res.data.teacher.userId.role,
                    firstName: res.data.teacher.firstName,
                    secondName: res.data.teacher.secondName,
                    thirdName: res.data.teacher.thirdName,
                    department: res.data.teacher.department,
                    rank: res.data.teacher.rank
                })
            }
        })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { studnumber, firstName, secondName, thirdName, role, course, group, department, rank } = this.state;
        return (
            <div>
                {role ? (
                    <TeacherProfile
                        studnumber={studnumber}
                        firstName={firstName}
                        secondName={secondName}
                        thirdName={thirdName}
                        department={department}
                        rank={rank}
                    />
                ) : (
                        <StudentProfile 
                        studnumber={studnumber} 
                        firstName={firstName} 
                        secondName={secondName} 
                        course={course} 
                        group={group}                         
                        />
                    )}
            </div>
        )
    }
}

export default userIsAuthenticatedRedirect(Profile);