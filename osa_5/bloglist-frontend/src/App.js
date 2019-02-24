import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

import './App.css'
import  { useField } from './hooks'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const username = useField('text')
    const password = useField('password')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addBlog = (event) => {
        event.preventDefault()

        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newURL
        }
        try {
            blogService
                .create(blogObject).then(returnedNote => {
                    setBlogs(blogs.concat(returnedNote))
                    setNewTitle('')
                    setNewAuthor('')
                    setNewURL('')
                })
        } catch (exception) {
            setErrorMessage('Bloggauksen lisääminen ei onnistunut, kumma juttu')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogin = async (event) => {
        console.log('käväsee')
        console.log(username)
        console.log(password.value)
        event.preventDefault()
        try {
            const user = await loginService.login({
                username:username.value, password:password.value,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            // setUsername('')
            // setPassword('')
        } catch (exception) {
            setErrorMessage('käyttäjätunnus tai salasana virheellinen')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        try {
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
            setErrorMessage('irjauduit sisään onnistuneesti')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        } catch (exception) {
            setErrorMessage('uloskirjautuminen ei onnistunut, kumma juttu..')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                käyttäjätunnus
                <input  {...username} />
            </div>
            <div>
                salasana
                <input  {...password} />
            </div>
            <button type="submit">kirjaudu</button>
        </form>
    )

    const logoutButton = () => (

        <button key="button-1" onClick={handleLogout} type="submit">kirjaudu pois</button>
    )

    const blogForm = () => {

        return (
            <Togglable buttonLabel='Lisää bloggaus' key="Togglable">
                <BlogForm
                    title={newTitle}
                    author={newAuthor}
                    URL={newURL}
                    handleTitleChange={({ target }) => setNewTitle(target.value)}
                    handleAuthorChange={({ target }) => setNewAuthor(target.value)}
                    handleURLChange={({ target }) => setNewURL(target.value)}
                    handleSubmit={addBlog}
                />
            </Togglable>
        )
    }

    const blogContent = () => (
        blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )
    )

    const Notification = ({ message }) => {
        if (message === null) {
            return null
        }
        return (

            <div className="notification">
                {message}
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={errorMessage} />
            {user === null ?
                loginForm() :
                [
                    logoutButton(),
                    blogForm(),
                    blogContent()
                ]
            }
        </div>
    )
}



export default App