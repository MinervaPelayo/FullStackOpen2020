import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { setUser } from '../reducers/loggedUserReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import Togglable from '../components/Toggable'

const LoginForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    event.target.username.value =''
    event.target.password.value =''

    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setUser(user))
      history.push('/')
    } catch (exception) {
      dispatch(setNotification('Wrong credentials',5))
    }
  }

  return (
    <div className="topBlock">
      <Togglable buttonLabel='Log in'>
        <div>
          <form className={classes.root} onSubmit={handleLogin}>
            <div>
              <TextField label="Username" variant="outlined" name="username"></TextField>
            </div>
            <div>
              <TextField label="Password" variant="outlined" name="password"></TextField>
            </div>
            <Button variant="contained" color="primary" type="submit">Login</Button>
          </form>
        </div>
      </Togglable>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: 200,
    },
  },
}))

export default LoginForm