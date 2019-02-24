import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
    const blog = {
        title: 'Blogisfääristä',
        author: 'U.Topia',
        likes: 1
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    const otsikko = component.container.querySelector('.otsikko')
    expect(otsikko).toHaveTextContent(
        'Blogisfääristä', 'U.Topia'
    )

    const tykkaykset = component.container.querySelector('.tykkaykset')
    expect(tykkaykset).toHaveTextContent(
        1
    )
})

it('clicking the button calls event handler once', async () => {
    const blog = {
        title: 'Blogisfääristä',
        author: 'U.Topia',
        likes: 1
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
})