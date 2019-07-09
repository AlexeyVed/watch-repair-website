import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';


import Header from './App/Header/Header.jsx'
import Main from "./App/Main/Main";
import MainAdmin from "./Admin/Main/MainAdmin";
import NoMatch from "./NoMatch/NoMatch";



class App extends React.Component {
  render () {
    return (
      <div className = 'app'>
        <Header/>
        <Switch>
            <Route exact path='/' component={Main}/>
            <Route path='/login' component={Main}/>
            <Route path='/registration' component={Main}/>
            <Route path='/admin' component={MainAdmin}/>
            <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}

export default connect(
  null,
  null
)(App)
