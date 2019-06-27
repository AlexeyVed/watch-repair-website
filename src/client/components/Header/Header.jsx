import React from 'react'
import { connect } from 'react-redux'

import { toggleModalLogin, toggleModalRegister, logOutApp, loginToApp } from '../../actions'
import './header.less'

const Header = props => {
  const { toggleLogin, toggleRegister, currentUser, logOut } = props

  let view = null

  if (!currentUser) {
    view = <React.Fragment>
      <div className='container-user'>
      </div>
      <div className='container-buttons'>
        <button
          className='container-buttons__button-login header-buttons'
          onClick = { toggleLogin }>
        Login In
        </button>
        <button
          className='container-buttons__button-register header-buttons'
          onClick = { toggleRegister }>
        Registration
        </button>
      </div>
    </React.Fragment>
  } else {
    view = <React.Fragment>
      <div className='container-user'>
        Welcome, { currentUser }
      </div>
      <div className='container-buttons'>
        <button
          className='container-buttons__button-logout header-buttons'
          onClick = { logOut }>
          Log Out
        </button>
      </div>
    </React.Fragment>
  }

  return (
    <div className = 'header'>
      <div className='container-logo'>
        <div className='container-logo__logo'></div>
        <div className='container-logo__description'>
          <div className='container-logo__description company-name'>ClockWise</div>
          <div className='container-logo__description tagline'>We make your time!</div>
        </div>
      </div>
      {view}
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    isActiveLogin: state.isActiveLogin,
    isActiveRegister: state.isActiveRegister,
    currentUser: state.loginReducer.singInUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleLogin: () => dispatch(toggleModalLogin()),
    toggleRegister: () => dispatch(toggleModalRegister()),
    logOut: () => dispatch(logOutApp())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
