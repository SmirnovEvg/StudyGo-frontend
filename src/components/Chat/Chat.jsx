import React from 'react'
import {
    Switch
} from 'react-router-dom';
import userIsAuthenticatedRedirect from '../../wrappers/userIsAuthenticatedRedirect';

import DialogList from './DialogList';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import { routes } from '../App/App';

function Chat() {
    const chatRoutes = routes.filter(item => {
        return item.path === '/chat'
    })

    return (
        <div>
            <DialogList />
            <Switch>
                {chatRoutes[0].routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </div>
    )
}

export default userIsAuthenticatedRedirect(Chat);