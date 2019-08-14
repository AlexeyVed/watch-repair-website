import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { singInFromLS } from '../actions'

import Preloader from './App/Preloader/Preloader.jsx'
import Header from './App/Header/Header.jsx'
import Footer from './App/Footer/Footer.jsx'
import MainOrder from './App/MainOrder/MainOrder.jsx'
import MainAdmin from './Admin/Main/MainAdmin'
import NoMatch from './NoMatch/NoMatch'
import LoginForm from "./App/LoginForm/LoginForm";

class App extends React.Component {
  componentDidMount () {
    const client = localStorage.getItem('user')

    if (client) {
      this.props.singInLS(client)
    }
  }

  render () {
    const { isRefactor, isLoad, isLoadData, isLogin } = this.props
    let preloader

    if (isRefactor || isLoad || isLoadData || isLogin) {
      preloader = <Preloader/>
    } else {
      preloader = null
    }
    return (
      <div className = 'app'>
        <Header/>
        <Switch>
          <Route exact path='/' component={MainOrder}/>
          <Route path='/login' component={MainOrder}/>
          <Route path='/admin' component={MainAdmin}/>
          <Route component={NoMatch}/>
        </Switch>
        <Footer/>
        {preloader}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isRefactor: state.adminReducer.refactorModelInProcess,
    isLoad: state.adminReducer.dataLoad,
    isLogin: state.loginReducer.singInLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    singInLS: user => dispatch(singInFromLS(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
