import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from '../components/Toggable'

const BlogForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const loggedUser = useSelector(state => {
    return { username: state.loggedUser.username, id: state.loggedUser.id }
  })

  const addBlog = (event) => {
    event.preventDefault()
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(content, loggedUser))
    dispatch(setNotification('A new blog was added',5))
  }

  return (
    <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
      <div className="formDiv">
        <Typography variant="h5">Add a new blog</Typography>
        <form className={classes.root} onSubmit={addBlog}>
          <div><TextField label="Title" variant="outlined" name="title"></TextField></div>
          <div><TextField label="Author" variant="outlined" name="author"></TextField></div>
          <div><TextField label="Url" variant="outlined" name="url"></TextField></div>
          <Button variant="contained" color="primary" type="submit">Create</Button>
        </form>
      </div>
    </Togglable>
  )
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

export default BlogForm