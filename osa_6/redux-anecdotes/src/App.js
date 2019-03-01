import React from 'react';
import { createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import { addVote, createAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {

    const anecdotes = props.store.getState()

    const newAnecdote = (event) => {
        event.preventDefault()
        props.store.dispatch(
            createAnecdote(event.target.anecdote.value)
        )
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                        {console.log(anecdote.content)}
                    </div>
                    <div>
                        has {anecdote.votes} votes
                        <button onClick={() => props.store.dispatch(addVote(anecdote.id))}>vote</button>
                        {console.log(anecdote.votes)}
                    </div>
                </div>
            )}
            <h2>create new</h2>

            <form onSubmit={newAnecdote}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>


        </div>
    )
}

export default App
