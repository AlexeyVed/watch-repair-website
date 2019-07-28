import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { changePage } from '../../../actions'
import LoginForm from '../LoginForm/LoginForm.jsx'
import RegistrationForm from '../RegistrationForm/RegistrationForm.jsx'
import LinkButton from '../../LinkButton/LinkButton.jsx'

class Main extends Component {
  componentDidMount () {
    this.props.page('main')
  }

  render () {
    const { currentUser } = this.props

    let adminLink

    if (currentUser === 'admin@example.com') {
      adminLink = <LinkButton to='/admin' name='Admin interface' className=''/>
    } else {
      adminLink = null
    }

    return (
      <div className='main'>
        <div className='home-page'>
          <div className='home-page__navigation'>
            {adminLink}
            <LinkButton to='/order' name='Make Order' className=''/>
          </div>
          <div className='home-page__header'>Welcome to our WebSite!</div>
          <div className='home-page__content'>{` /*   */   So, because you must choose us!`}</div>
          <div className='home-page__footer'>
            <Link to='/works'>Our Works</Link>
            <Link to='/about'>About Us</Link>
            <Link to='/contacts'>Contacts</Link>
          </div>
        </div>
        <Switch>
          <Route path='/login' component={LoginForm}/>
          <Route path='/registration' component={RegistrationForm}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.loginReducer.singInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    page: data => dispatch(changePage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
