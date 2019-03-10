import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {

    switch (action.type) {
        case 'CREATE_ANECDOTE':
            return [...state, action.data]

        case 'ADD_VOTE':
            const anecdotes = state.map(oldAnecdote =>
                oldAnecdote.id !== action.data.anecdote.id ? oldAnecdote : action.data.anecdote
            )
            return anecdotes

        case 'INIT_ANECDOTES':
            return action.data

        default:
            // console.log(state)
            return state
    }
}

export const addVote = (anecdote) => {
    anecdote.votes = anecdote.votes + 1
    return async dispatch => {
        anecdoteService.update(anecdote)
        dispatch({
            type: 'ADD_VOTE',
            data: { anecdote }
        })
    }
}


export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'CREATE_ANECDOTE',
            data: newAnecdote,
        })
    }
}


export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        })
    }
};

export default anecdoteReducer