import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import myInput from '../FieldRedux'

import { toggleModalLogin, loginToApp } from '../../actions'
import { validateEmail, validatePassword } from '../../validation'

import './LoginForm.less'

class LoginForm extends React.Component {

  render () {

    const { handleSubmit, toggleLogin, loginApp } = this.props

    return (
      <div className='modal-window'>
        <form
          onSubmit={handleSubmit(loginApp)}
          className='login-form'>
          <div className="login-form__header">
                        Member login
            <button
              className='login-form__header__right-button-close'
              onClick={toggleLogin}>
                            &times;
            </button>
          </div>
          <Field
            label='Your email'
            name='email'
            component={myInput}
            type='text'
            placeholder='Enter your email'
            validate={validateEmail}
          />
          <Field
            label='Your password'
            name='password'
            component={myInput}
            type='password'
            placeholder='Enter your password'
            validate={validatePassword}
          />
          <button type='submit' label='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleLogin: () => dispatch(toggleModalLogin()),
    loginApp: values => dispatch(loginToApp(values.email, values.password))
  };
}

const exportLoginForm = connect(
  null,
  mapDispatchToProps
)(LoginForm)

export default reduxForm({
  form: 'login',
})(exportLoginForm)
