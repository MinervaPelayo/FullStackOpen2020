const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

let timeout;
export const setNotification = (message, seconds) => {
  clearTimeout(timeout)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: message,
    })
    timeout = setTimeout(()=>{
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        notification: ''
      })
    },[seconds * 1000])
  }
}

export default notificationReducer