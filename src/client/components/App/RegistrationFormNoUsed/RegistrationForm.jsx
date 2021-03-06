import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../ComponentMaterial/TextField'
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
      missLoginError,
      page
    } = this.props

    let bttnClose = null

    if (currentUser) {
      return <Redirect to={{ pathname: '/' }}/>
    }

    if (loginError) {
      setTimeout(missLoginError, 3000)
    }

    if (page === 'order') {
      bttnClose = <LinkButton to='/order' name='&times;' className='login-form__header__right-button-close'/>
    } else {
      bttnClose = <LinkButton to='/' name='&times;' className='login-form__header__right-button-close'/>
    }

    return (
      ReactDOM.createPortal(
        <div className='modal-window'>
          <form onSubmit={handleSubmit(registration)} className='registration-form'>
            <div className="registration-form__header">
                        Registration
              {bttnClose}
            </div>
            <Field
              label='Your email'
              name='email'
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
              name='password'
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
    loginError: state.loginReducer.singInError,
    page: state.appReducer.page
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registration: values => dispatch(registrationToApp(values)),
    missLoginError: () => dispatch(missLoginError())
  }
}

const exportRegistrationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm)

export default reduxForm({
  form: 'registration'
})(exportRegistrationForm)
