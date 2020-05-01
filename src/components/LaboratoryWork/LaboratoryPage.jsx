import './LaboratoryPage.sass';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Switch
} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

import AuthService from '../../services/AuthService';
import userIsTeacherRedirect from '../wrappers/userIsTeacherRedirect';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import { routes } from '../App/App';
import CreateLaboratory from './CreateLaboratory';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const LaboratoryPage = () => {
    const classes = useStyles();
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
        <CreateLaboratory teacher={teacher}/>
        <div className="laboratory-page">
            <div className={classes.root}>
                <List component="nav" aria-label="secondary mailbox folder">
                    {laboratoryClasses && laboratoryClasses.map((item, index) => (
                        <Link key={index} to={`/laboratory/${item._id}`} onClick={(event) => handleListItemClick(event, item._id)}>
                            <ListItem
                                button
                                selected={selectedIndex === item._id}
                                onClick={(event) => handleListItemClick(event, item._id)}
                                key={index}
                            >
                                <ListItemText primary={`${item.course} ${item.group} ${item.groupPart} ${item.subject.name}`} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
            <div className="laboratory-page__laboratories">
                <Switch>
                    {laboratoryRoutes[0].routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        </div>
        </>
    )
}

export default userIsTeacherRedirect(LaboratoryPage);