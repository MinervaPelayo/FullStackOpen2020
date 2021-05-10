  
import React, { useState } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = (props) => {
  const [name, setName] = useState(null)
  const [year, setYear] = useState('')

  const authors = useQuery(ALL_AUTHORS, {
    onError: (error) => {
      console.log(error.graphQLErrors)
      props.setError(error.message)
    }
  })

  const [ changeBirthyear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  
  
  const submit = async (event) => {
    event.preventDefault()

    changeBirthyear({ variables: { name, setBornTo: Number(year)}})

    props.setPage('authors')
    setName(null)
    setYear('')
  }
  
  if (!props.show) {
    return null
  }

  return(
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select
          defaultValue={name}
          onChange={(el) => setName(el.value)}
          options={authors.data.allAuthors.map(a => 
            {return {
              value: a.name, 
              label: a.name
            }})}
          />
        </div>
        <div>
            born
            <input
              value={year}
              onChange={({ target }) => setYear(target.value)}
            />
        </div>  
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthor