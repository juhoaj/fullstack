import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {

    switch (action.type) {
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

        case 'INIT_ANECDOTES':
            return action.data

        default:
            // console.log(state)
            return state
    }
}

export const addVote = (id) => {
    return {
        type: 'ADD_VOTE',
        data: { id }
    }
}

export const createAnecdote = (data) => {
    return {
        type: 'CREATE_ANECDOTE',
        data
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        console.log('anet', anecdotes)
        dispatch( {
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        })
    }
};

export default anecdoteReducer