import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(u => u.id === id))

  if (!user) {
    return null
  }

  return(
    <div>
      <Typography variant="h4">{user.name}</Typography>
      <Typography style={{ marginTop: 20 }} variant="h6">Added blogs</Typography>
      <List>
        {user.blogs.map(u =>
          <ListItem key={u.id}>
            <ListItemText primary={'-- ' + u.title} />
          </ListItem>)}
      </List>
    </div>
  )
}

export default User