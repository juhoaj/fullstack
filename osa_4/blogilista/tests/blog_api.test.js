const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
]

const addedBlog = [
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
]


beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()

})



test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('three blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
})

test('after adding a blog four blogs are returned', async () => {
    let newBlogObject = new Blog(addedBlog[0])
    await newBlogObject.save()
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length + 1)
})

afterAll(() => {
    mongoose.connection.close()
})