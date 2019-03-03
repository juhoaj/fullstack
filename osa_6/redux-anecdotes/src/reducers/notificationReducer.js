const notificationReducer = (state = null, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return [action.data.content]
            case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}



export const setNotification = (content) => {
    return {
        type: 'SET_NOTIFICATION',
        data: {
            content
        }
    }
}

export const clearNotification = (content) => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export default notificationReducer