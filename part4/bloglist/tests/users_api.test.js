const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await listHelper.usersInDb()
  
      const newUser = {
        username: 'admin',
        name: 'Administrator',
        password: 'helloworld',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await listHelper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await listHelper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Administrator',
        password: 'helloworld',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('expected `username` to be unique')
  
      const usersAtEnd = await listHelper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is not at least 3 characters long', async () => {
        const usersAtStart = await listHelper.usersInDb()
    
        const newUser = {
          username: 'ad',
          name: 'Administrator',
          password: 'helloworld',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
  
        expect(result.body.error).toContain('must be at least 3 characters')
    
        const usersAtEnd = await listHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
})

afterAll(() => {
    mongoose.connection.close()
  })
  