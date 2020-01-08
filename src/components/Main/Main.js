import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from '../Auth/Auth';
import Post from '../Post/Post';
import Profile from '../Profile/Profile';
import Chat from '../Chat/Chat';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/post' component={Post} />      
            <Route exact path='/auth' component={Auth} />           
            <Route exact path='/profile' component={Profile} />           
            <Route exact path='/chat' component={Chat} />                     
        </Switch>
    </main>
)

export default Main;