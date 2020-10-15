const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [ 
    { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, 
    { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, 
    { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, 
    { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, 
    { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, 
    { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      _id: "5f87fe8fadc8bc7fe47e5f6c",
      username: "john",
      name: "john",
      passwordHash
  })
    await user.save()
    await Blog.deleteMany({})
  
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[3])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[4])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[5])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are five blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs have property id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  expect(blogs[0].id).toBeDefined();
})

test('a blog can be added', async () => {
  const newBlog = {
      title: 'Node js',
      author: 'John Smith',
      url: 'http://www.nodejs.edu',
      likes: 8,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpZCI6IjVmODdmZThmYWRjOGJjN2ZlNDdlNWY2YyIsImlhdCI6MTYwMjc0ODA3N30.pRt3VywHHv_sw4NyYAingX5kdN59dNwgmDcR8JPPLk4')    
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'Node js'
  )
})

test('likes property defaults to 0', async () => {
  const newBlog = {
      title: 'Node js',
      author: 'John Smith',
      url: 'http://www.nodejs.edu',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpZCI6IjVmODdmZThmYWRjOGJjN2ZlNDdlNWY2YyIsImlhdCI6MTYwMjc0ODA3N30.pRt3VywHHv_sw4NyYAingX5kdN59dNwgmDcR8JPPLk4')    
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body[6].likes).toBe(0)
})

test('respond 400 if title and url are missing from request', async () => {
  const newBlog = {
      title: 'Node js',
      likes: 10
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpZCI6IjVmODdmZThmYWRjOGJjN2ZlNDdlNWY2YyIsImlhdCI6MTYwMjc0ODA3N30.pRt3VywHHv_sw4NyYAingX5kdN59dNwgmDcR8JPPLk4')   
    .send(newBlog)
    .expect(400)
})

test('respond 401 if a token is not provided', async () => {
  const newBlog = {
    title: 'Node js',
    author: 'John Smith',
    url: 'http://www.nodejs.edu',
    likes: 8,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ')   
    .send(newBlog)
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})