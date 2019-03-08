import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {

    switch (action.type) {
        case 'CREATE_ANECDOTE':
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

export const addVote = (id, content, votes) => {

    const newVotes = votes +1
    console.log('uus',newVotes)
    return async dispatch => {
        anecdoteService.update({id:id, content: content, votes:newVotes})
        dispatch({
            type: 'ADD_VOTE',
            data: { id }
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
        dispatch( {
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        })
    }
};

export default anecdoteReducer