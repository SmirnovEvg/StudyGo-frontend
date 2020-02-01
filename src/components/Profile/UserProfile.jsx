import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import userIsAuthenticatedRedirect from '../../wrappers/userIsAuthenticatedRedirect';

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
        department: '',
        rank: '',
    }
    componentDidMount = async () => {
        try {
            let { match: { params } } = this.props;

            const res = await axios.get('http://localhost:3333/api/user/info', {
                params: {
                    userId: params.id,
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
                    rank: res.data.rank
                })
                :
                this.setState({
                    id: params.id,
                    role: res.data.role,
                    firstName: res.data.firstName,
                    secondName: res.data.secondName,
                    thirdName: res.data.thirdName,
                    course: res.data.course,
                    group: res.data.group
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