const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially three blogs saved', async () => {

    beforeEach(async () => {
        await Blog.deleteMany({})

        let blogObject = new Blog(helper.initialBlogs[0])
        await blogObject.save()

        blogObject = new Blog(helper.initialBlogs[1])
        await blogObject.save()

        blogObject = new Blog(helper.initialBlogs[2])
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
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('after adding a blog four blogs are returned', async () => {
        let newBlogObject = new Blog(helper.addedBlog[0])
        await newBlogObject.save()
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    })
    
    test('id, not _id is used in return', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined();
    })


})

describe('favoriteBlog returns most liked blog', async () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        let blogObject = new Blog(helper.initialBlogs[0])
        await blogObject.save()

        blogObject = new Blog(helper.initialBlogs[1])
        await blogObject.save()

        blogObject = new Blog(helper.initialBlogs[2])
        await blogObject.save()

    })

    test('blog is returned as json', async () => {
        await api
            .get('/api/blogs/favoriteBlog')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('blog title is what is expected', async () => {
        const resultBlog = await api
        .get(`/api/blogs/favoriteBlog`)
        expect(resultBlog.body.title).toEqual('Canonical string reduction')
    })

    test('if there are no blogs a error is returned', async () => {
        await Blog.deleteMany({})
        const result = await api
        .get(`/api/blogs/favoriteBlog`)
        expect(result.body.error).toEqual('No blog found with most likes')
    })


})



afterAll(() => {
    mongoose.connection.close()
})