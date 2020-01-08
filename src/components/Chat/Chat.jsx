import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import DialogList from './DialogList';
import MessageList from './MessageList';

export default function Chat() {
    return (
        <Router>
            <div>
                <DialogList />
                <Switch>
                    <Route path="/chat" exact component={ChatDefault} />
                    <Route path="/chat/:dialogId" component={MessageList} />
                </Switch>
            </div>
        </Router>
    )
}

const ChatDefault = () => (
    <div>
        <h2>chat</h2>
    </div>
)
