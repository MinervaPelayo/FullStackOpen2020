import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog, createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Typography, Button, TextField, List, ListItem, ListItemText, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const Blog = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const username =  useSelector(state => state.loggedUser.username)
  const id = useParams().id
  const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes))
  const blog = blogs.find(b => b.id === id)

  const likeBlog = () => {
    const obj = {
      id: blog.id,
      likes: blog.likes +1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    dispatch(updateBlog(obj))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification('The blog was deleted', 5))
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    const content = { comment: event.target.comment.value }
    event.target.comment.value = ''
    dispatch(createComment(blog.id, content))
  }

  if (!blog) {
    return null
  }

  return(
    <div>
      <Typography variant="h4">{blog.title} {blog.author}</Typography>
      <Typography variant="body1">URL: <a href={blog.url}>{blog.url}</a></Typography>
      <p>{blog.likes} likes</p>
      <Button variant="contained" color="primary" onClick={likeBlog}>Like</Button>
      <p><Typography variant="body2">Added by {blog.user.name}</Typography></p>
      { username === blog.user.username ? <p><Button variant="contained" color="secondary" onClick={removeBlog}>Delete</Button></p> : <p></p>}
      <Divider />
      <Typography variant="h6">Comments</Typography>
      <List>
        {blog.comments.map(c =>
          <ListItem key={c.id}>
            <ListItemText primary={'-- ' + c.comment} />
          </ListItem>)}
      </List>
      <form className={classes.root} onSubmit={addComment}>
        <div><TextField label="Comment" variant="outlined" name="comment"></TextField></div>
        <Button size="small" variant="contained" type="submit">Add comment</Button>
      </form>
    </div>
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

export default Blog