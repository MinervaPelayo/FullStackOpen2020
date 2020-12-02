import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const errorStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    color: 'rgb(255, 0, 0)',
    border: 'solid',
    borderWidth: 2,
    marginTop: 10
  }

  return (
    <div style={errorStyle} className="error">
      <h1>{message}</h1>
    </div>
  )
}

export default Notification