import React from 'react';
import {
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';

import Auth from '../Auth/Auth';
import Post from '../Post/Post';
import Profile from '../Profile/Profile';
import UserProfile from '../Profile/UserProfile';
import MessageList from '../Chat/CreateDialog';
import CreateDialog from '../Chat/MessageList';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import Chat from '../Chat/Chat';
import Timetable from '../Timetable/Timetable';

export const routes = [
    {
        path: "/post",
        component: Post
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
        path: "/profile",
        component: Profile,
    },
    {
        path: "/profile/:id",
        component: UserProfile
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
                <Switch>
                    {
                        routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))
                    }
                </Switch>
            </main>
        </Router>
    )
}