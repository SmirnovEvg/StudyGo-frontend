const events = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EVENT':
            return [...state, action.payload];
        case 'REMOVE_EVENT':
            return state.filter((event) => event._id !== action.payload);
        case 'EDIT_EVENT':
            state.filter((event) => event._id !== action.payload._id);
            return [...state, action.payload];
        case 'SET_EVENTS':
            return state = action.payload;
        default:
            return state
    }
}
export default events;