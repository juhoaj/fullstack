import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    return (
        <div>
            <h2>Anecdotes</h2>
            {props.anecdotes
                .filter(e =>
                    e.content.includes(props.filter))
                .sort(function (a, b) { return b.votes - a.votes })
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes} votes
                        <button onClick={() => {
                                props.addVote(anecdote.id)

                                props.setNotification('Äänestit ' + anecdote.content)
                                setTimeout(() => {
                                    props.clearNotification()
                                }, 5000)

                            }}>vote</button>
                        </div>
                        <br />
                    </div>
                )}
        </div>

    )
}

const mapDispatchToProps = {
    setNotification,
    clearNotification,
    addVote
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
        notification: state.notification
    }
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList