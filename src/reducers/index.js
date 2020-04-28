import AddAdditionalFormDisplay from "./AddAdditionalForm";
import Additionals from "./additionals";
import events from "./events";
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    AddAdditionalFormDisplay,
    Additionals,
    events
})

export default allReducers;