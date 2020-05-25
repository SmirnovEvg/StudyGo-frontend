import Additionals from "./additionals";
import events from "./events";
import unreadMessages from './unreadMessages';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    Additionals,
    events,
    unreadMessages,
})

export default allReducers;