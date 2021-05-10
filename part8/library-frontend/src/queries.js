import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title 
    published
    genres
    author { 
      name 
    }
  }
`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
{
  allBooks { 
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const CURRENT_USER = gql`
query {
  me { 
    username
    favoriteGenre
    id
  }
}
`

export const BOOKS_BY_GENRE = gql`
query findBooksByGenre($genre: String!) {
  allBooks(genre: $genre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title 
    author{ name }
    published
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`