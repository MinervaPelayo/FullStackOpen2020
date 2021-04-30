import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Typography, Container } from '@material-ui/core'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setUser } from './reducers/loggedUserReducer'
import './App.css'
import NavBar from './components/NavBar'
import MainView from './components/MainView'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  return (
    <Router>
      { loggedUser && <NavBar />}
      <Container>
        <div className="topBlock">
          <Typography variant="h2">Blog App</Typography>
          <Notification />
        </div>
        <Switch>
          <Route path="/users/:id" component={User} />
          <Route path="/users" component={Users} />
          <Route path="/blogs/:id" component={Blog} />
          <Route path="/login" component={LoginForm} />
          <Route path="/">{loggedUser ? <MainView /> : <Redirect to="/login" /> }</Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App