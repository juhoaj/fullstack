import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css';

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [addBlogVisible, setAddBlogVisible] = useState(false)

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
    /*
    const handleTitleChange = (event) => { setNewTitle(event.target.value) }
    const handleAuthorChange = (event) => { setNewAuthor(event.target.value) }
    const handleURLChange = (event) => { setNewURL(event.target.value) }
    */

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
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
            window.localStorage.removeItem('loggedBlogappUser');
            setUser(null)
            setErrorMessage(`kirjauduit sisään onnistuneesti`)
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
          <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                salasana
          <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">kirjaudu</button>
        </form>
    )

    const logoutForm = () => (
        <form onSubmit={handleLogout}>
            <button type="submit">kirjaudu pois</button>
        </form>
    )

    const blogForm = () => {
        const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
        const showWhenVisible = { display: addBlogVisible ? '' : 'none' }
    
        return (
          <div>
            <div style={hideWhenVisible}>
              <button onClick={() => setAddBlogVisible(true)}>Lisää</button>
            </div>
            <div style={showWhenVisible}>
              <BlogForm
                title={newTitle}
                author={newAuthor}
                URL={newURL}
                handleTitleChange={({ target }) => setNewTitle(target.value)}
                handleAuthorChange={({ target }) => setNewAuthor(target.value)}
                handleURLChange={({ target }) => setNewURL(target.value)}
                handleSubmit={addBlog}
              />
              <button onClick={() => setAddBlogVisible(false)}>Peru</button>
            </div>
          </div>
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
                    logoutForm(),
                    <br/>,
                    blogForm(),
                    blogContent()
                ]
            }
        </div>
    )
}



export default App