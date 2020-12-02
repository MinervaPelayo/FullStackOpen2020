import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => {return b.likes - a.likes})
      setBlogs(blogs)
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage('A new blog was added')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const changeBlog = async (blogObject) => {
    const newObject ={
      user: user.id,
      likes: blogObject.likes,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url
    }

    const updatedBlog = await blogService.update(blogObject.id, newObject)

    if(updatedBlog.likes === blogObject.likes){
      const updatedList = await blogService.getAll()
      updatedList.sort((a,b) => {return b.likes - a.likes})
      setBlogs(updatedList)
    }
  }

  const removeBlog = async (blogId) => {
    const response = await blogService.remove(blogId)

    if(!response.error){
      const updatedList = await blogService.getAll()
      updatedList.sort((a,b) => {return a.likes - b.likes})
      setBlogs(updatedList)
      setMessage('The blog was deleted')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } else {
      setMessage(response.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='Log in'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='Add a blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Blog App</h2>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged-in <button type="button" onClick={logOut}>Log Out</button></p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} name={user.name} updateBlog={changeBlog} deleteBlog={removeBlog}/>
      )}
    </div>
  )
}

export default App