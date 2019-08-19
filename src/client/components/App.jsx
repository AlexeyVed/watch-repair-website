import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { returnPageHome, singInFromLS } from '../actions'

import LinkButton from './LinkButton/LinkButton.jsx'
import Preloader from './App/Preloader/Preloader.jsx'
import Header from './App/Header/Header.jsx'
import Footer from './App/Footer/Footer.jsx'
import MainOrder from './App/MainOrder/MainOrder.jsx'
import MainAdmin from './Admin/Main/MainAdmin'
import NoMatch from './NoMatch/NoMatch'

class App extends React.Component {
  componentDidMount () {
    const client = localStorage.getItem('user')

    if (client) {
      this.props.singInLS(client)
    }
  }

  render () {
    const { isRefactor, isLoad, isLoadData, isLogin, user, chooseMaster, returnHomePage } = this.props
    let preloader,
      adminButton,
      homeButton

    if (isRefactor || isLoad || isLoadData || isLogin) {
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
          <Header/>
          <Switch>
            <Route exact path='/' component={MainOrder}/>
            <Route path='/login' component={MainOrder}/>
            <Route path='/admin' component={MainAdmin}/>
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
    user: state.loginReducer.singInUser,
    chooseMaster: state.appReducer.chooseWorker
  }
}

const mapDispatchToProps = dispatch => {
  return {
    singInLS: user => dispatch(singInFromLS(user)),
    returnHomePage: () => dispatch(returnPageHome())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
