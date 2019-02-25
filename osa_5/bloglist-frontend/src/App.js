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
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)

    const newTitle = useField('text')
    const newAuthor = useField('text')
    const newURL = useField('text')
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
            title: newTitle.value,
            author: newAuthor.value,
            url: newURL.value
        }
        try {
            blogService
                .create(blogObject).then(returnedNote => {
                    setBlogs(blogs.concat(returnedNote))
                    newTitle.reset()
                    newAuthor.reset()
                    newURL.reset()
                })
        } catch (exception) {
            setErrorMessage('Bloggauksen lisääminen ei onnistunut, kumma juttu')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogin = async (event) => {

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
            username.reset()
            password.reset()
            console.log('käväsee')
            console.log(password.value)
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
                    title={newTitle.value}
                    author={newAuthor.value}
                    URL={newURL.value}
                    handleTitleChange={newTitle.onChange}
                    handleAuthorChange={newAuthor.onChange}
                    handleURLChange={newURL.onChange}
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