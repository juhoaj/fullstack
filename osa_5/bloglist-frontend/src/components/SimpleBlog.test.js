import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

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