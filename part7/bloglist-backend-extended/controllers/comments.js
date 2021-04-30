const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentsRouter.get('/:id/comments', async (request, response) =>{
  const blogId = request.params.id
  const blog = await Blog.findById(blogId).populate('comments')
  response.json(blog)
})

commentsRouter.post('/:id/comments', async (request, response, next) => {
  const blogId = request.params.id
  const data = request.body.comment
  
  try{
  const blog = await Blog.findById(blogId)
  const comment = new Comment({
    comment: data,
    blog: blog._id
  })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    response.status(201).json(savedComment)
  }catch (exception) {
    next(exception)
  }
})

module.exports = commentsRouter