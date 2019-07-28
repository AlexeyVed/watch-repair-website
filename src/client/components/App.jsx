import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { singInFromLS } from '../actions'

import Header from './App/Header/Header.jsx'
import Main from './App/Main/Main'
import MainOrder from './App/MainOrder/MainOrder.jsx'
import MainAdmin from './Admin/Main/MainAdmin'
import NoMatch from './NoMatch/NoMatch'
import {Circle2} from "react-preloaders";

class App extends React.Component {
  componentDidMount () {
    const client = localStorage.getItem('user')

    if (client) {
      this.props.singInLS(client)
    }
  }

  render () {
    return (
      <div className = 'app'>
        <Header/>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/order' component={MainOrder}/>
          <Route path='/login' component={Main}/>
          <Route path='/registration' component={Main}/>
          <Route path='/admin' component={MainAdmin}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    singInLS: user => dispatch(singInFromLS(user))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
