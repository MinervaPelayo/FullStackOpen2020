import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const Togglable = React.forwardRef ((props, ref) => {
  const classes = useStyles()
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          className={classes.btn}
          variant="contained"
          color="secondary"
          onClick={toggleVisibility}>
            Cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

const useStyles = makeStyles((theme) => ({
  btn: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}))

export default Togglable