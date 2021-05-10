require("dotenv").config()
const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('../models/book')
const Author = require('../models/author')
const User = require('../models/user')

const JWT_SECRET = process.env.SECRET
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(args.author && args.genre){
        const author = await Author.findOne({ name: args.author})
        const books = await Book.find({
          $and: [
            { author: author._id},
            { genres: { $in: [args.genre]} }
          ]
        }).populate("author")
        return books
      } else if(args.author){
        const author = await Author.findOne({ name: args.author})
        const books = await Book.find({ author: author._id }).populate("author")
        return books
      } else if(args.genre) {
        return Book.find({ genres: { $in: [args.genre]} }).populate("author")
      }
      return Book.find({}).populate("author")
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const editedAuthors = authors.map(a => {
        return {
          name: a.name,
          born: a.born,
          bookCount: a.books.length,
          id: a.i
        }
      })

      return editedAuthors
    },
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const author = await Author.findOne({ name: args.author})
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try{
        let book
        if(!author){
          const newauthor = new Author({ name: args.author })
          const createdAuthor = await newauthor.save()
          book = new Book({ ...args, author: createdAuthor._id })
        } else {
          book = new Book({ ...args, author: author._id})
        }
        await book.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: Book.findOne({ title: args.title }).populate("author") })
        return Book.findOne({ title: args.title }).populate("author")
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name})
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== JWT_SECRET ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}

module.exports = { resolvers }