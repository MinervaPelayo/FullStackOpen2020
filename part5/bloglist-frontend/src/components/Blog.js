import React, { useState } from 'react'

const Blog = ({ blog, name, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginTop: 10
  }

  const btnStyle = {
    marginLeft:10
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    updateBlog({
      id: blog.id,
      likes: blog.likes +1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const removeBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
      setVisible(!visible)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button style={btnStyle} onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible} className='VisibleContent'>
        {blog.title}<span> {blog.author}</span>
        <button style={btnStyle} onClick={toggleVisibility}>Hide</button>
        <p className='BlogUrl'>{blog.url}</p>
        <span className='BlogLikes'>Likes {blog.likes}</span>
        <button style={btnStyle} onClick={likeBlog}>LikeBlog</button>
        { name === blog.user.name ? <p><button style={btnStyle} onClick={removeBlog}>Delete</button></p> : <p></p>}
      </div>
    </div>
  )
}

export default Blog
