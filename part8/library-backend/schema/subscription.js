const { gql } = require('apollo-server')

const Subscription = gql`
  type Subscription{
    bookAdded: Book!
  }
`
module.exports = { Subscription }