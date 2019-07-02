import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './App/Header/Header.jsx'
import Main from './App/Main/Main.jsx'
import Nav from './navigation.jsx'
import MainAdmin from './Admin/Main/MainAdmin.jsx'
import Portal from './App/PortalAuthentication/PortalAuthentication.jsx'

class App extends React.Component {
  render () {
    const { isAdmin } = this.props

    return (
      <div className = 'app'>
        <Header/>
        <Nav/>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/admin" component={MainAdmin} />
        </Switch>
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
