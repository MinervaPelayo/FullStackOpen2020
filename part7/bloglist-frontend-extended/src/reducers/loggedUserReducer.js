import blogService from '../services/blogs'

const loggedUserReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}

export default loggedUserReducer