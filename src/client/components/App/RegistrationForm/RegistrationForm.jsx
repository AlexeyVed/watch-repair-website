import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'

import { validateEmail, confirmEmail, confirmPassword, validatePassword } from '../../../validation'
import { missLoginError, registrationToApp } from '../../../actions'

import './RegistrationForm.less'

class RegistrationForm extends Component {
  render () {
    const {
      handleSubmit,
      registration,
      currentUser,
      loginError,
      missLoginError } = this.props

    if (currentUser) {
      return <Redirect to={{ pathname: '/' }}/>
    }

    if (loginError) {
      setTimeout(missLoginError, 3000)
    }

    return (
      ReactDOM.createPortal(
        <div className='modal-window'>
          <form onSubmit={handleSubmit(registration)} className='registration-form'>
            <div className="registration-form__header">
                        Registration
              <LinkButton to='/' name='&times;' className='login-form__header__right-button-close'/>
            </div>
            <Field
              label='Your email'
              name='emailReg'
              component={myInput}
              type='text'
              placeholder='Enter your email'
              validate={[validateEmail]}
              required
            />
            { loginError &&
            !currentUser &&
            <div className='registration-form__input-error'>
              {loginError}
            </div>
            }
            <Field
              label='Confirm your email'
              name='confirm-email-reg'
              component={myInput}
              type='text'
              placeholder='Confirm your email'
              validate={[validateEmail, confirmEmail]}
              required
            />
            <Field
              label='Create a password'
              name='passwordReg'
              component={myInput}
              type='password'
              placeholder='Enter your password'
              validate={validatePassword}
              required
            />
            <Field
              label='Confirm your password'
              name='confirm-password'
              component={myInput}
              type='password'
              placeholder='Confirm your password'
              validate={[confirmPassword]}
              required
            />
            <button type='submit' label='submit'>Submit</button>
          </form>
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.loginReducer.singInUser,
    loginError: state.loginReducer.singInError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registration: values => dispatch(registrationToApp(values.emailReg, values.passwordReg)),
    missLoginError: () => dispatch(missLoginError())
  }
}

RegistrationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm)

export default reduxForm({
  form: 'registration'
})(RegistrationForm)
