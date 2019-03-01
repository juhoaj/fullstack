import React from 'react';
import { addVote, createAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {

    const anecdotes = props.store.getState()

    return (
        <div>
            
            <AnecdoteForm store={props.store} />
            <AnecdoteList store={props.store} />
        </div>
    )
}

export default App
