const { gql } = require('apollo-server')

const AuthorSchema = gql`
  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }
`
module.exports = { AuthorSchema }