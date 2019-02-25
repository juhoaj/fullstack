import React, { useState } from 'react'

const Blog = ({ blog }) => {
    const [show, setDisplay] = useState('none')

    const blogStyle = {
        paddingTop: 1,
        paddingLeft: 1,
        paddingBottom: 4,
        border: 'solid grey',
        borderWidth: 1,
        marginBottom: 5
    }

    const collapserStyle = {
        display: show
    }

    const showHide = () => {
        console.log('jeba')
        if (show==='none') {
            setDisplay('block')
        } else {
            setDisplay('none')
        }
    }

    return (
        <div style={blogStyle} onClick={ showHide }>
            <div >
                {blog.title} {blog.author}
            </div>
            <div style={collapserStyle}>
                URL: {blog.url} <br/> Likes: {blog.likes}
            </div>
        </div>
    )
}

export default Blog