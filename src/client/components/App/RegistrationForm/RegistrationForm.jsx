import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import myInput from '../../FieldRedux'
import { validateEmail, confirmEmail, confirmPassword, validatePassword } from '../../../validation'

import './RegistrationForm.less'
import ReactDOM from "react-dom";
import LinkButton from "../../LinkButton/LinkButton.jsx";

class RegistrationForm extends Component {
  render () {
    const { handleSubmit } = this.props

    return (
      ReactDOM.createPortal(
      <div className='modal-window'>
        <form onSubmit={handleSubmit} className='registration-form'>
          <div className="registration-form__header">
                        Registration
            <LinkButton to='/' name='&times;' className='login-form__header__right-button-close'/>
          </div>
          <Field
            label='Your email'
            name='email-reg'
            component={myInput}
            type='text'
            placeholder='Enter your email'
            validate={[validateEmail]}
            required
          />
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

RegistrationForm = connect(
  null
)(RegistrationForm)

export default reduxForm({
  form: 'registration',
  onSubmit: values => console.log(values)
})(RegistrationForm)
