const Additionals = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ADDITIONAL':
            return [...state, action.payload];
        case 'REMOVE_ADDITIONAL':
            return state.filter((additional) => additional._id !== action.payload);
        case 'GET_ADDITIONALS':
            return state = action.payload;
        default:
            return state
    }
}
export default Additionals;