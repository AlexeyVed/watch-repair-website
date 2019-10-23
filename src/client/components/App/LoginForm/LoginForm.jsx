import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import TextField from '../../ComponentMaterial/TextField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'

import { loginToApp, missLoginError } from '../../../actions'
import { validateEmail, validatePassword, required } from '../../../validation'

import './LoginForm.less'

class LoginForm extends React.Component {
  render () {
    const {
      handleSubmit,
      loginApp,
      pristine,
      submitting,
      currentUser,
      loginError,
      missLoginError
    } = this.props

    if (loginError) {
      setTimeout(missLoginError, 3000)
    }

    if (currentUser) {
      return <Redirect to={{ pathname: '/admin' }}/>
    }

    return (
      ReactDOM.createPortal(
        <div className='modal-window'>
          <div className='login-form'>
            <div className='login-form__header'>
              Member login
              <LinkButton to='/' name='&times;' className='login-form__header__right-button-close'/>
            </div>
            <form
              onSubmit={handleSubmit(loginApp)}>
              <Field
                label='Your email'
                name='email'
                component={TextField}
                type='text'
                placeholder='Enter your email'
                validate={ [validateEmail, required] }
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
                component={TextField}
                type='password'
                placeholder='Enter your password'
                validate={ [validatePassword, required] }
              />
              <button
                type='submit'
                disabled={pristine || submitting}
                label='submit'>Submit</button>
            </form>
          </div>
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
