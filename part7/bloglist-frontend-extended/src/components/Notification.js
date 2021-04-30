import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div>
      {(notification &&
        <Alert severity="success">
          {notification}
        </Alert>
      )}
    </div>
  )
}

export default Notification