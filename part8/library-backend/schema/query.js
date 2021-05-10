const { gql } = require('apollo-server')

const Query = gql` 
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    me: User
  }
`

module.exports = { Query }