import React from 'react'

const Notify = ({ message }) => {
  if ( !message ) {
    return null
  }

  return(
    <div>
      <h3 style={{ color: 'red'}}>
        {message}
      </h3>
    </div>
  )
}

export default Notify