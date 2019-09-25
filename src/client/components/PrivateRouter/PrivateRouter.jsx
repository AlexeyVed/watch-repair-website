import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import MainAdmin from '../Admin/Main/MainAdmin'

function PrivateRoute ({ component: Component, auth, ...rest }) {
  return (
    <Route
      render={ () => {
        return (auth === 'admin@example.com') ? <MainAdmin/> : <Redirect to={{ pathname: '/login' }}/>
      }}
    />
  )
}

export default PrivateRoute
