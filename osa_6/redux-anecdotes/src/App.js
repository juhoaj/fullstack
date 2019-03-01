import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = (props) => {
    console.log(props.store.getState())
    return (
        <div>
            <Notification store={props.store} />
            <AnecdoteForm store={props.store} />
            <AnecdoteList store={props.store} />
            
        </div>
    )
}

export default App
