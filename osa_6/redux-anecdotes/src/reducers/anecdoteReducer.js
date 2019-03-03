const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

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

export const createAnecdote = (content) => {
    return {
        type: 'CREATE_ANECDOTE',
        data: {
            content,
            id: getId(),
            votes: 0
        }
    }
}

export const initializeAnecdotes = (notes) => {
    return {
        type: 'INIT_ANECDOTES',
        data: notes,
    };
};

export default anecdoteReducer