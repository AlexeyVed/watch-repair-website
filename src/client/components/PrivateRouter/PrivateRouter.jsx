import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import MainAdmin from '../Admin/Main/MainAdmin'

function PrivateRoute ({ component: Component, auth, ...rest }) {
  return (
    <Route
      render={props => {
        if (auth === 'admin@example.com') {
          return <MainAdmin/>
        } else {
          return (
            <Redirect to={{ pathname: '/login' }}/>
          )
        }
      }}
    />
  )
}

export default PrivateRoute
