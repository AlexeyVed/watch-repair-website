import React from 'react'
import { connect } from 'react-redux'

import Header from './App/Header/Header.jsx'
import Main from './App/Main/Main.jsx'
import MainAdmin from './Admin/Main/MainAdmin.jsx'
import Portal from './App/PortalAuthentication/PortalAuthentication.jsx'

class App extends React.Component {
  render () {
    const { isAdmin } = this.props

    return (
      <div className = 'app'>
        <Header/>
        {(isAdmin !== 'admin@example.com') ? <Main/> : <MainAdmin/>}
        <Portal/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.loginReducer.singInUser
  }
}

export default connect(mapStateToProps)(App)
