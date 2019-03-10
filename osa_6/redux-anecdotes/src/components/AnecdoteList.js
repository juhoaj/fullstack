import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const vote = (id) => {
        const votedAnecdote = props.visibleAnecdotes.find(e => e.id.includes(id))
        props.addVote(votedAnecdote)
        props.setNotification(`you voted '${votedAnecdote.content}'`, 10)
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            {props.visibleAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes
                        <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
                    </div>
                    <br />
                </div>
            )}
        </div>
    )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
    if (filter === '') { return anecdotes.sort(function (a, b) { return b.votes - a.votes })}
    return anecdotes.filter(e => e.content.includes(filter) )
  }

const mapDispatchToProps = {
    setNotification,
    addVote
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state),
        notification: state.notification
    }
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
