import React from 'react'
import { connect } from 'react-redux'

import Header from './Header/Header.jsx'
import Main from './Main'
import MainAdmin from './AdminMain/MainAdmin.jsx'
import Portal from './PortalAuthentication/PortalAuthentication.jsx'

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
