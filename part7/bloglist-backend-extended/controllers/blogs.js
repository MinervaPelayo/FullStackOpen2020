const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
   const data = request.body

   const token = request.token
   
   try{
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: data.title,
      author: data.author,
      url: data.url,
      likes: data.likes,
      user: user._id
     })

    const savedData = await blog.save()
    user.blogs = user.blogs.concat(savedData._id)
    await user.save()
    response.status(201).json(savedData)
   } catch(exception){
      next(exception)
   }

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  try{
    const updatedData = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.status(200).json(updatedData)
  } catch(exception){
    next(exception)
  }
  
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const token = request.token
   
  try{

   const decodedToken = jwt.verify(token, process.env.SECRET)
   const blog = await Blog.findById(request.params.id)

   if (!token || !decodedToken.id) {
     return response.status(401).json({ error: 'token missing or invalid' })
   } else if(blog.user.toString() === decodedToken.id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
   }

   response.status(401).json({ error: 'unauthorized' })
  }
  catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter