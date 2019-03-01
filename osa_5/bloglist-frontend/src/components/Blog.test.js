import React from 'react'
import { render, fireEvent, getByTitle, container } from 'react-testing-library'
import Blog from './Blog'

test('clicking the button calls event handler once', async () => {
    const blog = {
        title: 'Blogisfääristä',
        author: 'U.Topia',
        url: '127.0.0.1',
        likes: 1
    }

    fireEvent(
        getByTitle(container, 'blog'),
        new MouseEvent('click', {
        })
    )


})