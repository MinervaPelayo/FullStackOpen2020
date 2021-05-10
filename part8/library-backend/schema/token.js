const { gql } = require('apollo-server')

const Token = gql`
  type Token {
    value: String!
  }
`

module.exports = { Token }