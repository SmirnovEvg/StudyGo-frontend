import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import userIsAuthenticatedRedirect from '../wrappers/userIsAuthenticatedRedirect';
import AuthService from "../../services/AuthService";

import UserStudentProfile from './UserStudentProfile';
import UserTeacherProfile from './UserTeacherProfile';

class UserProfile extends Component {

    state = {
        id: '',
        firstName: '',
        secondName: '',
        thirdName: '',
        role: '',
        course: '',
        group: '',
        groupPart: '',
        department: '',
        rank: '',
        dialog: '',
        image: ''
    }
    componentDidMount = async () => {
        try {
            let { match: { params } } = this.props;
            const user = AuthService.getUser();

            const res = await axios.get('http://localhost:3333/api/user/info', {
                params: {
                    userId: params.id,
                }
            })

            const dialog = await axios.get('http://localhost:3333/api/chat/dialog/findbyusers', {
                params: {
                    userId: params.id,
                    profileUserId: user._id
                }
            })

            res.data.role ?
                this.setState({
                    id: params.id,
                    role: res.data.role,
                    firstName: res.data.firstName,
                    secondName: res.data.secondName,
                    thirdName: res.data.thirdName,
                    department: res.data.department,
                    rank: res.data.rank,
                    additionals: res.data.additionals,
                    subjects: res.data.subjects,
                    dialog: dialog.data.length && dialog.data[0]._id,
                    image: res.data.image,
                })
                :
                this.setState({
                    id: params.id,
                    role: res.data.role,
                    firstName: res.data.firstName,
                    secondName: res.data.secondName,
                    thirdName: res.data.thirdName,
                    course: res.data.course,
                    group: res.data.group,
                    groupPart: res.data.groupPart,
                    dialog: dialog.data.length && dialog.data[0]._id,
                })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { role } = this.state;
        return (
            <>
                {role ? (
                    <UserTeacherProfile
                        {...this.state}
                    />
                ) : (
                        <UserStudentProfile
                            {...this.state}
                        />
                    )}
            </>
        )
    }
}

export default userIsAuthenticatedRedirect(withRouter(UserProfile));