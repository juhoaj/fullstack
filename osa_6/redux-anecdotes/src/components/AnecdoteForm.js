import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        props.createAnecdote(newAnecdote.content)

        props.setNotification('Lisäsit seuraavaan viisauden: ' + newAnecdote.content)
                            setTimeout(() => {
                                props.clearNotification()
                            }, 5000)
        
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

const mapDispatchToProps = {
    createAnecdote,
    setNotification,
    clearNotification
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        notification: state.notification
    }
}

const ConnectedNewAnecdote = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewAnecdote)
export default ConnectedNewAnecdote