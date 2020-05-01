import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import userIsAuthenticatedRedirect from '../wrappers/userIsAuthenticatedRedirect';
import AuthService from '../../services/AuthService';
import Button from '../Inputs/Button/Button';

import { getAdditionals } from '../../actions';

import StudentProfile from './StudentProfile';
import TeacherProfile from './TeacherProfile';

function Profile(props) {
    const [studnumber, setStudnumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [thirdName, setThirdName] = useState("");
    const [role, setRole] = useState("");
    const [course, setCourse] = useState("");
    const [group, setGroup] = useState("");
    const [groupPart, setGroupPart] = useState("");
    const [department, setDepartment] = useState("");
    const [rank, setRank] = useState("");
    const [additionals, setAdditional] = useState("");
    const [subjects, setSubject] = useState("");

    const dispatch = useDispatch();                     

    
    useEffect(() => {
        const getUser = async () => {
            try {
                const token = AuthService.getToken();
                const user = AuthService.getUser();

                const res = await axios.get('http://localhost:3333/api/user', {
                    headers: {
                        Authorization: token
                    }
                })                

                switch (res.data.userId.role) {
                    case 0:
                        setStudnumber(user.studnumber);
                        setRole(user.role);
                        setFirstName(user.firstName);
                        setSecondName(user.secondName);
                        setThirdName(user.thirdName);
                        setCourse(res.data.course);
                        setGroup(res.data.group);
                        setGroupPart(res.data.groupPart)
                        break;

                    case 1:
                        setStudnumber(user.studnumber);
                        setRole(user.role);
                        setFirstName(user.firstName);
                        setSecondName(user.secondName);
                        setThirdName(user.thirdName);
                        setDepartment(res.data.department);
                        setRank(res.data.rank);
                        setAdditional(res.data.additionals);
                        setSubject(res.data.subjects);
                        dispatch(getAdditionals(res.data.additionals))                        
                        break;

                    default:
                        break;
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    }, [dispatch])

    const signOut = () => {
        AuthService.removeTokenUser();
    }

    return (
        <div>
            {role ? (
                <TeacherProfile
                    studnumber={studnumber}
                    role={role}
                    firstName={firstName}
                    secondName={secondName}
                    thirdName={thirdName}
                    department={department}
                    rank={rank}
                    additionals={additionals}
                    subjects={subjects}
                />
            ) : (
                    <StudentProfile
                    studnumber={studnumber}
                    role={role}
                    firstName={firstName}
                    secondName={secondName}
                    thirdName={thirdName}
                    course = {course}
                    group = {group}
                    groupPart = {groupPart}
                    />
                )}
                <Button
                        variant="contained"
                        color="secondary"
                        onClick={signOut}
                    >Выйти</Button>
        </div>
    )
}

export default userIsAuthenticatedRedirect(Profile);