require("dotenv").config()
const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('./models/user')
const { resolvers } = require('./resolvers/index')
const { AuthorSchema } = require('./schema/author')
const { BookSchema } = require('./schema/book')
const { UserSchema } = require('./schema/user')
const { Token } = require('./schema/token')
const { Mutation } = require('./schema/mutation')
const { Query } = require('./schema/query')
const { Subscription } = require('./schema/subscription')

const MONGODB_URI =process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})

const server = new ApolloServer({
  typeDefs: [ Query, Mutation, Subscription, AuthorSchema, BookSchema, UserSchema, Token ],
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})