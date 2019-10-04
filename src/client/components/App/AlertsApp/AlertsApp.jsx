import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { connect } from 'react-redux'
import MySnackbarContentWrapper from '../../ComponentMaterial/Snackbar/'
import { missErrors } from '../../../actions'

class AppSnackbars extends React.Component() {
  render () {
    const [open, setOpen] = React.useState(false)
    const { makeOrderError } = this.props

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }
      setOpen(false)
    }
    if (makeOrderError) {
      setOpen(true)
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant="success"
            message="This is an error message!"
          />
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant="error"
            message = { makeOrderError }
          />
        </Snackbar>
        {/* <MySnackbarContentWrapper
            variant="error"
            className={classes.margin}
            message="This is an error message!"
          />
          <MySnackbarContentWrapper
            variant="success"
            className={classes.margin}
            message="This is a success message!"
         /> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    makeOrderError: state.appReducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    missAppError: () => dispatch(missErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSnackbars)
