import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':{
    const obj = { ...action.data.content, user: action.data.user }
    return [...state, obj]
  }
  case 'LIKE_BLOG': {
    const id = action.data.id
    return state.map(blog => blog.id !== id ? blog : { ...blog, likes: action.data.likes })
  }
  case 'DELETE_BLOG': {
    const id = action.data.id
    return state.filter(blog => blog.id !== id)
  }
  case 'NEW_COMMENT': {
    const id = action.data.id
    const newComment = action.data.content
    return state.map(blog => blog.id !== id ? blog : { ...blog, comments: [...blog.comments, newComment] })
  }
  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog,
    })
  }
}

export const createBlog = (content, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: {
        content: newBlog,
        user: user
      }
    })
  }
}

export const deleteBlog = (blogId) => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch({
      type: 'DELETE_BLOG',
      data: {
        id: blogId
      },
    })
  }
}

export const createComment = (blogId, content) => {
  return async dispatch => {
    const newComment = await blogService.addComment(blogId, content)
    dispatch({
      type: 'NEW_COMMENT',
      data: {
        id: blogId,
        content: newComment,
      }
    })
  }
}

export default reducer