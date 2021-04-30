import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Form calls the event handler it received as props', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputAuthor = component.container.querySelector('.Author')
  const inputTitle = component.container.querySelector('.Title')
  const inputUrl = component.container.querySelector('.Url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'Testing Title' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'Testing Author' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'www.testurl.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls).toEqual([[{ title: 'Testing Title',  author: 'Testing Author', url: 'www.testurl.com' }]])
})