import React from 'react'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends React.Component {
  render () {
    return (
      <Route
        render={ () => {
          return (this.props.auth === 'admin@example.com') ? <this.props.component/> : <Redirect to={{ pathname: '/login' }}/>
        }}
      />
    )
  }
}

export default PrivateRoute
