import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {


    const addAnecdote = (event) => {
        event.preventDefault()
        props.createAnecdote(event.target.anecdote.value)
        props.setNotification('Lisäsit seuraavaan viisauden: ' + event.target.anecdote.value)
                            setTimeout(() => {
                                props.clearNotification()
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