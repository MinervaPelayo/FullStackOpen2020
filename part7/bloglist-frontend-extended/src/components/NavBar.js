import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Toolbar, Typography, AppBar } from '@material-ui/core'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const classes = useStyles()
  const loggedUser = useSelector(state => state.loggedUser)

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.userText} variant="h6">{loggedUser.username} / logged-in</Typography>
          <Button color="inherit" component={Link} to="/">Blogs</Button>
          <Button color="inherit" component={Link} to="/users">Users</Button>
          <Button className={classes.logoutButton} color="inherit" onClick={logOut}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  userText: {
    flexGrow: 1,
  },
  logoutButton: {
    marginLeft: theme.spacing(6),
  },
  navButton: {
    marginLeft: theme.spacing(2)
  }
}))

export default NavBar