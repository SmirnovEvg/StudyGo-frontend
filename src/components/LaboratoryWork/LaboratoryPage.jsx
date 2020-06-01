import React, { useState, useEffect } from 'react';
import styles from './LaboratoryPage.module.sass';
import axios from 'axios';
import {
    Switch
} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

import AuthService from '../../services/AuthService';
import userIsTeacherRedirect from '../wrappers/userIsTeacherRedirect';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import { routes } from '../App/App';
import CreateLaboratory from './CreateLaboratory';
import { withRouter } from "react-router";
import { ReactComponent as FITLogo } from "../../static/images/FITLogo.svg";

const LaboratoryPage = (props) => {
    const [laboratoryClasses, setLaboratoryClasses] = useState([]);
    const [teacher, setTeacher] = useState([]);

    const laboratoryRoutes = routes.filter(item => {
        return item.path === '/laboratory'
    })


    useEffect(() => {
        const getLaboratoryClasses = async () => {
            const token = AuthService.getToken();

            const res = await axios.get('http://localhost:3333/api/user', {
                headers: {
                    Authorization: token
                }
            })
            setTeacher(res.data)


            axios.get('http://localhost:3333/api/laboratoryclass/teacher', {
                params: {
                    teacherId: res.data.userId._id
                }
            }).then(res => {
                setLaboratoryClasses(res.data)
            })
        }
        getLaboratoryClasses();
    }, []);

    const [selectedIndex, setSelectedIndex] = React.useState(laboratoryClasses[0] ? laboratoryClasses[0]._id : '');

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <CreateLaboratory teacher={teacher} />
            <div className={styles.laboratoryPage}>
                <div className={styles.laboratoryPageList}>
                    <List component="nav" aria-label="main mailbox folder" className={styles.laboratoryList}>
                        {laboratoryClasses && laboratoryClasses.map((item, index) => (
                            <Link key={index} to={`/laboratory/${item._id}`} onClick={(event) => handleListItemClick(event, item._id)}>
                                <ListItem
                                    button
                                    selected={selectedIndex === item._id}
                                    onClick={(event) => handleListItemClick(event, item._id)}
                                    key={index}
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    <ListItemText primary={`${item.course}-${item.group}/${item.groupPart} ${item.subject.name}`} className={styles.listItem} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </div>
                {!props.match.isExact ? (<div className={styles.laboratoryPage__laboratories}>
                    <Switch>
                        {laboratoryRoutes[0].routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </div>) : (
                        <div className={styles.laboratoryLogo}>
                            <FITLogo />
                        </div>
                    )}
            </div>
        </>
    )
}

export default userIsTeacherRedirect(withRouter(LaboratoryPage));