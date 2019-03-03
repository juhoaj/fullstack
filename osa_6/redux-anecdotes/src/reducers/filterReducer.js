const filterReducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'SET_FILTER':
            return [action.data.content]
        case 'CLEAR_FILTER':
            return null
        default:
            return state
    }
}



export const setFilter = (content) => {
    return {
        type: 'SET_FILTER',
        data: {
            content
        }
    }
}

export const clearFilter = (content) => {
    return {
        type: 'CLEAR_FILTER'
    }
}

export default filterReducer