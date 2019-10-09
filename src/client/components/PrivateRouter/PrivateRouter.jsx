import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkAccesAdmin } from '../../actions/'

class PrivateRoute extends React.Component {
  componentDidMount () {
    if (this.props.user) {
      this.props.checkAuth(this.props.user)
    }
  }
  render () {
    const { user, isAuth, inProcess } = this.props
    return (
      <Route
        render={ () => {
          return !user ? <Redirect to={{ pathname: '/login' }}/> : inProcess ? <div className='mask'></div> : isAuth ? <this.props.component/> : <Redirect to={{ pathname: '/login' }}/>
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.singInUser,
    isAuth: state.loginReducer.isAuth,
    inProcess: state.loginReducer.singInLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: email => dispatch(checkAccesAdmin(email))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute)
