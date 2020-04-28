import React from 'react';
import {
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';

import Auth from '../Auth/Auth';
import Profile from '../Profile/Profile';
import UserProfile from '../Profile/UserProfile';
import MessageList from '../Chat/CreateDialog';
import CreateDialog from '../Chat/MessageList';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import Chat from '../Chat/Chat';
import Timetable from '../Timetable/Timetable';
import LaboratoryPage from '../LaboratoryWork/LaboratoryPage';
import LaboratoryWork from '../LaboratoryWork/LaboratoryWork';
import EventsPage from '../Events/EventsPage';
import Main from '../Main/Main';

export const routes = [
    {
        path: "/auth",
        component: Auth
    },
    {
        path: "/timetable",
        component: Timetable
    },
    {
        path: "/events",
        component: EventsPage
    },
    {
        exact: true,
        path: "/profile",
        component: Profile,
    },
    {
        path: "/profile/:id",
        component: UserProfile
    },
    {
        path: "/laboratory",
        component: LaboratoryPage,
        routes: [
            {
                path: "/laboratory/:laboratoryId",
                component: LaboratoryWork
            },
        ]
    },
    {
        path: "/chat",
        component: Chat,
        routes: [
            {
                exact: true,
                path: "/chat/:dialogId",
                component: CreateDialog
            },
            {
                path: "/chat/user/:partnerId",
                component: MessageList
            }
        ]
    }
];

export default function App() {
    return (
        <Router>
            <main>
                <Main>
                <Switch>
                    {
                        routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))
                    }
                </Switch>
                </Main>
            </main>
        </Router>
    )
}