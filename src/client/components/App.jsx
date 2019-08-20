import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { returnPageHome } from '../actions'

import LinkButton from './LinkButton/LinkButton.jsx'
import PrivateRoute from './PrivateRouter/PrivateRouter.jsx'
import Preloader from './App/Preloader/Preloader.jsx'
import ModalWindow from './ModalWindow/ModalWindowAdmin.jsx'
import Header from './App/Header/Header.jsx'
import Footer from './App/Footer/Footer.jsx'
import MainOrder from './App/MainOrder/MainOrder.jsx'
import MainAdmin from './Admin/Main/MainAdmin'
import NoMatch from './NoMatch/NoMatch'

class App extends React.Component {
  render () {
    const { isRefactor, isOrder, isLoad, isLoadData, isLogin, user, chooseMaster, returnHomePage, modalAdmin } = this.props
    let preloader,
      adminButton,
      homeButton

    if (isRefactor || isLoad || isLoadData || isLogin || isOrder) {
      preloader = <Preloader/>
    } else {
      preloader = null
    }

    if (chooseMaster && user === 'admin@example.com') {
      adminButton = <LinkButton to='/admin' name='&gt;'/>
      homeButton = <button className='buttonHome' onClick={ returnHomePage }>&lt;</button>
    } else if (user === 'admin@example.com') {
      adminButton = <LinkButton to='/admin' name='&gt;'/>
      homeButton = <LinkButton to='/' name='&lt;'/>
    } else if (chooseMaster) {
      adminButton = null
      homeButton = <button className='buttonHome' onClick={ returnHomePage }>&lt;</button>
    } else {
      adminButton = null
      homeButton = null
    }

    return (
      <div className = 'app'>
        <div className='app-admin'>
          { homeButton }
          { adminButton }
        </div>
        <div className= 'app-main'>
          {(modalAdmin) ? <ModalWindow/> : null}
          <Header/>
          <Switch>
            <Route exact path='/' component={MainOrder}/>
            <Route path='/login' component={MainOrder}/>
            <PrivateRoute path='/admin' component={MainAdmin} auth={user}/>
            <Route component={NoMatch}/>
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
    isRefactor: state.adminReducer.refactorModelInProcess,
    isLoad: state.adminReducer.dataLoad,
    isLogin: state.loginReducer.singInLoading,
    isOrder: state.appReducer.isMakeOrder,
    user: state.loginReducer.singInUser,
    chooseMaster: state.appReducer.chooseWorker,
    modalAdmin: state.adminReducer.showModal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    returnHomePage: () => dispatch(returnPageHome())
  }
}

const AppWithRouter = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default withRouter(AppWithRouter)
