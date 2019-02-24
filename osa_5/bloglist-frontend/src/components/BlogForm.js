import React from 'react'

const BlogForm = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleURLChange,
    title,
    author,
    URL
}) => (
    <div>
        <h4>Lisää bloggaus</h4>
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={handleTitleChange}
            />
            <input
                value={author}
                onChange={handleAuthorChange}
            />
            <input
                value={URL}
                onChange={handleURLChange}
            />
            <button type="submit">tallenna</button>
        </form>
    </div>
)

export default BlogForm