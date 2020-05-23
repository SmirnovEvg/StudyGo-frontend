import React from 'react';
import styles from './Chat.module.sass';
import {
    Switch
} from 'react-router-dom';
import userIsAuthenticatedRedirect from '../wrappers/userIsAuthenticatedRedirect';

import DialogList from './DialogList';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import { routes } from '../App/App';
import { withRouter } from "react-router";
import useWindowSize from "../../services/useWindowSize.js";
import { ReactComponent as FITLogo } from "../../static/images/FITLogo.svg";

function Chat(props) {
    const size = useWindowSize();
    
    const chatRoutes = routes.filter(item => {
        return item.path === '/chat'
    })

    return (
        <div 
            className={styles.chatPage}
            style={{transform: `${size.width <= 700 && (!props.match.isExact ? 'translateX(-115%)' : 'translateX(0%)')}`}}
        >
            <DialogList />
            <Switch>
                {chatRoutes[0].routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
            {props.match.isExact && <div className={styles.emptyDialog}><FITLogo className={styles.fitImage}/><span>Выберите чат, чтобы начать обмен сообщениями</span></div>}
        </div>
    )
}

export default userIsAuthenticatedRedirect(withRouter(Chat));