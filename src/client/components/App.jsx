import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import PrivateRoute from './PrivateRouter/PrivateRouter.jsx'
import Preloader from './App/Preloader/Preloader.jsx'
import Header from './App/Header/Header.jsx'
import Footer from './App/Footer/Footer.jsx'
import MainOrder from './App/MainOrder/MainOrder.jsx'
import MainAdmin from './Admin/Main/MainAdmin'
import NoMatch from './NoMatch/NoMatch'

class App extends React.Component {
  constructor (props) {
    super()
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['authorization'] = token
    }
  }
  render () {
    const { isOrder, isLoad, isLogin, user } = this.props

    let preloader

    if (isLoad || isLogin || isOrder) {
      preloader = <Preloader/>
    } else {
      preloader = null
    }

    return (
      <div className = 'app'>
        <div className='app-admin'>
        </div>
        <div className= 'app-main'>
          <Header/>
          <Switch>
            <Route exact path='/' component={MainOrder}/>
            <Route path='/login' component={MainOrder}/>
            <PrivateRoute path='/admin/' component={MainAdmin} auth={user}/>
            <Route component={NoMatch} />
          </Switch>
          <Footer/>
          { preloader }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoad: state.appReducer.dataLoad,
    isLogin: state.loginReducer.singInLoading,
    isOrder: state.appReducer.isMakeOrder,
    user: state.loginReducer.singInUser,
    token: state.loginReducer.token
  }
}

export default connect(
  mapStateToProps,
  null
)(App)
