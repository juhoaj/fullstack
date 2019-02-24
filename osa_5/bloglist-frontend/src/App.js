import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

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

        blogService
            .create(blogObject).then(returnedNote => {
                setBlogs(blogs.concat(returnedNote))
                setNewTitle('')
                setNewAuthor('')
                setNewURL('')
            })
    }

    const handleTitleChange = (event) => { setNewTitle(event.target.value) }
    const handleAuthorChange = (event) => { setNewAuthor(event.target.value) }
    const handleURLChange = (event) => { setNewURL(event.target.value) }

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

    const blogForm = () => (
        <form onSubmit={addBlog}>
            <input
                value={newTitle}
                onChange={handleTitleChange}
            />
            <input
                value={newAuthor}
                onChange={handleAuthorChange}
            />
            <input
                value={newURL}
                onChange={handleURLChange}
            />
            <button type="submit">tallenna</button>
        </form>
    )

    const blogContent = () => (
        blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )
    )


    return (
        <div>
            <h2>blogs</h2>

            {user === null ?
                loginForm() :
                [
                    blogForm(),
                    blogContent()
                ]
            }       
            
        </div>
    )
}

export default App