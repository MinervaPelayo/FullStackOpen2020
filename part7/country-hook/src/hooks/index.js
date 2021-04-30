import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`

  useEffect(() => {
    if(name){
      axios(url)
      .then((res)=>{
        setCountry({data: res.data[0], found: true})
      })
      .catch((err)=>{
        console.error(err)
        setCountry({data: null, found:false})
      })
    }
  },[name, url])

  return country
}