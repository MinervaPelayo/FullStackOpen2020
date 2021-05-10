import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  let allgenres = []
  const [books, setBooks] = useState([])
  const allBooksResult = useQuery(ALL_BOOKS)
  const [getBooksByGenre, byGenreResult] = useLazyQuery(BOOKS_BY_GENRE) 

  useEffect(() => {
    if (allBooksResult.data) {
      setBooks(allBooksResult.data.allBooks)
    }
  }, [allBooksResult])

  useEffect(() => {
    if (byGenreResult.data) {
      setBooks(byGenreResult.data.allBooks)
    }
  }, [byGenreResult])

  const filterByGenre = (genre) => {
    if(genre === 'all'){
      setBooks(allBooksResult.data.allBooks)
    }else{
      getBooksByGenre({ variables: { genre } })
    }
  }

  if(!allBooksResult.loading){
    allBooksResult.data.allBooks.forEach(el => {
      for (let i = 0; i < el.genres.length; i++) {
        allgenres.push(el.genres[i])
      }
    })
    allgenres = [...new Set(allgenres)]
  }

  if (!props.show) {
    return null
  }

  if (allBooksResult.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {allgenres.map(g=>
        <button key={g} onClick={() => filterByGenre(g)}>{g}</button>
      )}
      <button onClick={() => filterByGenre('all')}>All genres</button>
    </div>
  )
}

export default Books