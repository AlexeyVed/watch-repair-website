import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkAccesAdmin } from '../../actions/'

class PrivateRoute extends React.Component {
  state = {
    waitResponse: true
  }

  componentDidMount () {
    console.log('im wonna chek auth', this.props.user)
    this.props.checkAuth(this.props.user)
      .then(res => {
        console.log('im chek auth with response', res)
        this.setState(() => ({ waitResponse: false }))
      })
  }
  render () {
    console.log(this.props.isAuth, this.props.user)
    return (
      <Route
        render={ () => {
          return this.state.waitResponse ? null : this.props.isAuth ? <this.props.component/> : <Redirect to={{ pathname: '/login' }}/>
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
