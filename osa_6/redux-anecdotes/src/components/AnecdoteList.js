import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'



const AnecdoteList = (props) => {
    const vote = (id, addVote) => {
        const votedAnecdote = props.visibleAnecdotes.find(e => e.id.includes(id))
        console.log(votedAnecdote)
        console.log(votedAnecdote.id)
        console.log(votedAnecdote.content)
        console.log(votedAnecdote.votes)
        props.addVote(votedAnecdote.id, votedAnecdote.content, votedAnecdote.votes)
        props.setNotification('Äänestit ' + votedAnecdote.content)
            setTimeout(() => {
                this.props.clearNotification()
            }, 5000)
            
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
    if (filter === '') {
      return anecdotes.sort(function (a, b) { return b.votes - a.votes })
    }
    const filteredAnecfotes = anecdotes.filter(e =>
        e.content.includes(filter)
    )
    // return filteredAnecfotes.sort(function (a, b) { return b.votes - a.votes })
    return anecdotes.filter(e => e.content.includes(filter) )
  }

const mapDispatchToProps = {
    setNotification,
    clearNotification,
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
