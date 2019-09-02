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
    const { isOrder, isLogin, user, cityLoad, clockLoad, customerLoad, masterLoad, orderLoad } = this.props

    const isPreloader = cityLoad ||
        clockLoad ||
        customerLoad ||
        masterLoad ||
        orderLoad ||
        isLogin ||
        isOrder || false
    return (
      <div className = 'app'>
        <div className= 'app-main'>
          <Header/>
          <Switch>
            <Route exact path='/' component={MainOrder}/>
            <Route path='/login' component={MainOrder}/>
            <PrivateRoute path='/admin/' component={MainAdmin} auth={user}/>
            <Route component={NoMatch} />
          </Switch>
          <Footer/>
          {(isPreloader) ? <Preloader/> : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cityLoad: state.cityReducer.dataLoad,
    clockLoad: state.clockReducer.dataLoad,
    customerLoad: state.customerReducer.dataLoad,
    masterLoad: state.masterReducer.dataLoad,
    orderLoad: state.orderReducer.dataLoad,
    isLogin: state.loginReducer.singInLoading,
    isOrder: state.appReducer.isMakeOrder,
    user: state.loginReducer.singInUser
  }
}

export default connect(
  mapStateToProps,
  null
)(App)
