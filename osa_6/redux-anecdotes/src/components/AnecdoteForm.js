import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {


    const addAnecdote = (event) => {
        event.preventDefault()
        props.store.dispatch(createAnecdote(event.target.anecdote.value))
        props.store.dispatch(setNotification('Lisäsit seuraavaan viisauden: ' + event.target.anecdote.value))
                            setTimeout(() => {
                                props.store.dispatch(clearNotification())
                            }, 5000)
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewAnecdote