import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { logOutApp } from '../../../actions'

import './header.less'


class Header extends React.Component {
  state = {
    redirect: false
  }

  handleClickLogOut = () => {
    this.props.logOut()
    this.setState({ redirect: true })
  }

  render () {
    const { currentUser } = this.props

    let view = null

    if (this.state.redirect) {
      this.setState({ redirect: false })
      return <Redirect to={{ pathname: '/' }}/>
    }

    if (!currentUser) {
      view = <React.Fragment>
        <div className='container-user'>
        </div>
        <div className='container-buttons'>
          <LinkButton to='/login' name='Login In'/>
          <LinkButton to='/registration' name='Registration'/>
        </div>
      </React.Fragment>
    } else {
      view = <React.Fragment>
        <div className='container-user'>
          Welcome,  {currentUser}
        </div>
        <div className='container-buttons'>
          <button
            className='container-buttons__button-logout header-buttons'
            onClick={this.handleClickLogOut}>
            Log Out
          </button>
        </div>
      </React.Fragment>
    }

    return (
      <div className='header'>
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
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.loginReducer.singInUser,
    redirectLogOut: state.loginReducer.redirectLogOut
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOutApp())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
