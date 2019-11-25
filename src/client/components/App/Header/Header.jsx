import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logOutApp } from '../../../actions'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'

import './header.less'

export class ModuleHeader extends React.Component {
  state = {
    redirect: false,
    redirectAdmin: false
  }

  handleClickLogOut = () => {
    this.props.logOut()
    this.setState({ redirect: true })
  }

  clickLogo = () => {
    this.setState({ redirect: true })
  }

  clickUser = () => {
    this.setState({ redirectAdmin: true })
  }

  render () {
    const { currentUser } = this.props
    let style

    if (this.state.redirect) {
      this.setState({ redirect: false })
      return <Redirect to={{ pathname: '/' }}/>
    }

    if (this.state.redirectAdmin) {
      this.setState({ redirectAdmin: false })
      return <Redirect to={{ pathname: '/admin' }}/>
    }

    currentUser ? style = 'container-logo' : style = 'container-logo full-logo'
    return (
      <div className='header'>
        <div className={`${style}`} onClick={this.clickLogo}>
        </div>
        {(!currentUser) ? <React.Fragment>
          <div className='container-user'>
          </div>
        </React.Fragment> : <React.Fragment>
          <div className='container-user'>
            <div className='container-user__user' onClick={this.clickUser}>
              {currentUser}
            </div>
          </div>
          <div className='container-buttons'>
            <button
              className='container-buttons__button-logout header-buttons'
              onClick={this.handleClickLogOut}>
              {<ExitToAppRoundedIcon/>}
            </button>
          </div>
        </React.Fragment>
        }
      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    currentUser: state.loginReducer.singInUser,
    redirectLogOut: state.loginReducer.redirectLogOut
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOutApp())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleHeader)
