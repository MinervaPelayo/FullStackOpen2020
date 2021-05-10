const { gql } = require('apollo-server')

const BookSchema = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
`

module.exports = { BookSchema }