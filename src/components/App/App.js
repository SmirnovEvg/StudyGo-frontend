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
import EventsListPage from '../Events/EventsListPage';
import Main from '../Main/Main';
import EventPage from '../Events/EventPage';
import NotFound from '../NotFound/NotFound';
import General from '../General/General';

export const routes = [
    {
        exact: true,
        path: "/",
        component: General
    },
    {
        path: "/auth",
        component: Auth
    },
    {
        path: "/timetable",
        component: Timetable
    },
    {
        exact: true,
        path: "/events",
        component: EventsListPage
    },
    {
        path: "/events/:id",
        component: EventPage
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
    },
    {
        component: NotFound
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