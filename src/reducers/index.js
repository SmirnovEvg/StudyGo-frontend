import Additionals from "./additionals";
import events from "./events";
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    Additionals,
    events
})

export default allReducers;