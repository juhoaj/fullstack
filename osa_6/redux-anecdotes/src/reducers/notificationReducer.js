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

export const showNotification = (content) => {
    return {
        type: 'SET_NOTIFICATION',
        data: {
            content
        }
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export const setNotification = (content, time) => {
    return async => {
    showNotification(content)
        setTimeout(() => {
            clearNotification()
        }, time*100)
    }
}

export default notificationReducer