const notificationsAtStart = [
    'notificationReducerin alkuarvoksi asettaman viestin'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (notification) => {
    return {
        content: notification,
        id: getId()
    }
}

const initialState = notificationsAtStart.map(asObject)

const notificationReducer = (state = 'notificationReducerin alkuarvoksi asettaman viestin', action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        /*
        case 'CREATE_ANECDOTE':
            console.log(action.data)
            return [...state, action.data]

        case 'ADD_VOTE':
            const id = action.data.id
            const anecdoteVoted = state.find(n => n.id === id)
            const changedAnecdote = {
                ...anecdoteVoted,
                votes: anecdoteVoted.votes + 1
            }
            const anecdotes = state.map(anecdote =>
                anecdote.id !== id ? anecdote : changedAnecdote
            )
            return anecdotes
        */
        default:
            return state
    }
}


/*
export const createNotification = (content) => {
    console.log(content)
    return {
      type: 'CREATE_NOTIFICATION',
      data: {
          content,
          id: getId()
      }
    }
  }
*/
export default notificationReducer