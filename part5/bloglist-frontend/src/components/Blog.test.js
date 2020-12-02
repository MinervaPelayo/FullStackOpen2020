import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('initially renders just title and author', () => {
  const blog = {
    id: '35235165416541',
    likes: 31,
    author: 'Minerva Pelayo',
    title: 'Creating react apps',
    url: 'www.minervablog.com',
    user: { name: 'Testuser' },
  }

  const component = render(
    <Blog blog={blog} />
  )

  const urlp = component.container.querySelector('.BlogUrl')
  const likestext = component.container.querySelector('.BlogLikes')

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(urlp).not.toBeVisible()
  expect(likestext).not.toBeVisible()
})

test('clicking the button shows details', () => {
  const blog = {
    id: '35235165416541',
    likes: 31,
    author: 'Minerva Pelayo',
    title: 'Creating react apps',
    url: 'www.minervablog.com',
    user: { name: 'Testuser' },
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} toggleVisibility={mockHandler}/>
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  const div = component.container.querySelector('.VisibleContent')
  const urlp = component.container.querySelector('.BlogUrl')
  const likestext = component.container.querySelector('.BlogLikes')

  expect(div).not.toHaveStyle('display: none')
  expect(urlp).toBeVisible()
  expect(likestext).toBeVisible()
})

test('Like button is clicked twice', () => {
  const blog = {
    id: '35235165416541',
    likes: 31,
    author: 'Minerva Pelayo',
    title: 'Creating react apps',
    url: 'www.minervablog.com',
    user: { name: 'Testuser' },
  }

  const mockLikeHandler = jest.fn()
  const mockVisibilityHandler = jest.fn()

  const component = render(
    <Blog blog={blog} toggleVisibility={mockVisibilityHandler} updateBlog={mockLikeHandler}/>
  )

  const Detailsbutton = component.getByText('View')
  fireEvent.click(Detailsbutton)

  const Likebutton = component.getByText('Like')
  fireEvent.click(Likebutton)
  fireEvent.click(Likebutton)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})

