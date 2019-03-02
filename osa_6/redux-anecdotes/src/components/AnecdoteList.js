import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {



    return (
        <div>
            <h2>Anecdotes</h2>
            {store.getState().anecdotes.sort(function (a, b) { return b.votes - a.votes }).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes
                        <button onClick={() => {
                            store.dispatch(addVote(anecdote.id), setNotification('jeba'))
                            store.dispatch(setNotification('Äänestit ' + anecdote.content))
                            setTimeout(() => {
                                store.dispatch(clearNotification())
                            }, 5000)
                        }}>vote</button>
                    </div>
                    <br/>
                </div>
            )}
        </div>
        
    )
}

export default AnecdoteList