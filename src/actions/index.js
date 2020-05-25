export const addAdditional = (item) => {
    return{
        type: 'ADD_ADDITIONAL',
        payload: item
    }
}

export const removeAdditional = (id) => {
    return{
        type: 'REMOVE_ADDITIONAL',
        payload: id
    }
}

export const getAdditionals = (additionals) => {
    return {
        type: 'GET_ADDITIONALS',
        payload: additionals
    }
}

export const createEvent = (event) => {
    return {
        type: 'ADD_EVENT',
        payload: event
    }
}

export const setEvents = (event) => {
    return {
        type: 'SET_EVENTS',
        payload: event
    }
}

export const removeEvent = (id) => {
    return {
        type: 'REMOVE_EVENT',
        payload: id
    }
}

export const updateEvent = (event) => {
    return {
        type: 'EDIT_EVENT',
        payload: event
    }
}

export const getUreadMessages = (messageCount) => {
    return {
        type: 'GET_UNREAD_MESSAGES',
        payload: messageCount
    }
}

const unreadMessages = (count) => {
    return {
        type: 'CLEAR_UNREAD_MESSAGES',
        payload: count
    }
}

export const clearUreadMessages = (count) => {
    return(dispatch) => {
        setTimeout(() => {
            dispatch(unreadMessages(count))
        }, 1000);
    }
}