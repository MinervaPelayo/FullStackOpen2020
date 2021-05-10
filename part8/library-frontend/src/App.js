import React, { useState, useEffect } from 'react'
import { useApolloClient,useSubscription, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import Notify from './components/Notify'
import { CURRENT_USER, BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const user = useQuery(CURRENT_USER)

  useEffect(()=>{
    const token = localStorage.getItem('library-user-token')
    if(token){
      setToken(token)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook)
      window.alert(`${addedBook.title} added`)      
      updateCacheWith(addedBook)
    }
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify message={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token ? 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('editauthor')}>edit author</button>
            <button onClick={() => setPage('recommendations')}>recommendations</button>
          </> : 
          <button onClick={() => setPage('login')}>login</button>
        }
        { token && <button onClick={logout}>Logout</button> }
      </div>
      <Authors
        show={page === 'authors'}
      />
      <EditAuthor
        setError={notify}
        setPage={setPage}
        show={page === 'editauthor'}
      />
      <Books
        token={token}
        show={page === 'books'}
      />
      <NewBook
        setError={notify}
        setPage={setPage}
        show={page === 'add'}
      />
      <Recommendations 
        user={user}
        show={page === 'recommendations'}
      />
      <LoginForm 
        setToken={setToken}
        setError={notify}
        setPage={setPage}
        show={page === 'login'}
      />
    </div>
  )
}

export default App