const { gql } = require('apollo-server')

const UserSchema = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
`

module.exports = { UserSchema }