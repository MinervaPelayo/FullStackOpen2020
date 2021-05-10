import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { CURRENT_USER, BOOKS_BY_GENRE } from '../queries'

const Recommendations = (props) => {
  const [books, setBooks] = useState(null)
  const userResult = useQuery(CURRENT_USER)
  const [getBooksByGenre, byGenreResult] = useLazyQuery(BOOKS_BY_GENRE) 

  useEffect(() => {
    if(userResult.data && userResult.data.me){
      const genre = userResult.data.me.favoriteGenre
      getBooksByGenre({ variables: { genre } })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userResult.data])

  useEffect(() => {
    if (byGenreResult.data) {
      setBooks(byGenreResult.data.allBooks)
    }
  }, [byGenreResult])

  if (!props.show) {
    return null
  }

  if (byGenreResult.loading || userResult.loading)  {
    return <div>loading...</div>
  }

  return(
    <div>
      <h2>Recommendations</h2>
      {userResult.data.me && <p>books in your favorite genre <b>{userResult.data.me.favoriteGenre}</b></p>}
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
    </div>
  )
}

export default Recommendations