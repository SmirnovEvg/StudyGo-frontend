const unreadMessages = (state = 0, action) => {
    switch (action.type) {
        case 'CLEAR_UNREAD_MESSAGES':
            return state -= action.payload;
        case 'GET_UNREAD_MESSAGES':
            return state = action.payload;
        default:
            return state
    }
}
export default unreadMessages;