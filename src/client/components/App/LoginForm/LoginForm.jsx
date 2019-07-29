import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'

import { loginToApp, missLoginError } from '../../../actions'
import { validateEmail, validatePassword } from '../../../validation'

import './LoginForm.less'
import { Placeholder } from "react-preloading-screen";

class LoginForm extends React.Component {
  render () {
    const {
      handleSubmit,
      loginApp,
      pristine,
      submitting,
      currentUser,
      loginError,
      missLoginError,
      page,
      isSingIn
    } = this.props

    let bttnClose = null
    let loader

    if (loginError) {
      setTimeout(missLoginError, 3000)
    }

    if (page === 'order') {
      bttnClose = <LinkButton to='/order' name='&times;' className='login-form__header__right-button-close'/>
    } else {
      bttnClose = <LinkButton to='/' name='&times;' className='login-form__header__right-button-close'/>
    }

    if (isSingIn) {
      loader = <Placeholder>
        <div className='preloader'>
          <div className='loader'>
          </div>
        </div>
      </Placeholder>
    } else {
      loader = null
    }

    if (currentUser === 'admin@example.com') {
      return <Redirect to={{ pathname: '/admin' }}/>
    } else if (currentUser) {
      return <Redirect to={{ pathname: '/' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <form
            onSubmit={handleSubmit(loginApp)}
            className='login-form'>
            <div className="login-form__header">
              Member login
              {bttnClose}
            </div>
            <Field
              label='Your email'
              name='email'
              component={myInput}
              type='text'
              placeholder='Enter your email'
              validate={validateEmail}
            />
            { loginError &&
            !currentUser &&
            <div className='login-form__input-error'>
              {loginError}
            </div>
            }
            <Field
              label='Your password'
              name='password'
              component={myInput}
              type='password'
              placeholder='Enter your password'
              validate={validatePassword}
            />
            <button
              type='submit'
              disabled={pristine || submitting}
              label='submit'>Submit</button>
            {loader}
          </form>
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.loginReducer.singInUser,
    loginError: state.loginReducer.singInError,
    page: state.appReducer.page,
    isSingIn: state.loginReducer.singInLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginApp: values => dispatch(loginToApp(values)),
    missLoginError: () => dispatch(missLoginError())
  }
}

const exportLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default reduxForm({
  form: 'login'
})(exportLoginForm)
