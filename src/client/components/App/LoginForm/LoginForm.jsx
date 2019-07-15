import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { BrowserRouter as Router, Redirect} from 'react-router-dom';

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'

import { loginToApp } from '../../../actions'
import { validateEmail, validatePassword } from '../../../validation'

import './LoginForm.less'


class LoginForm extends React.Component {

  render () {

    const { handleSubmit, loginApp, pristine, submitting, currentUser } = this.props

    if (currentUser === 'admin@example.com') {
      return <Redirect to={{pathname: '/admin'}}/>
    } else if (currentUser) {
      return <Redirect to={{pathname: '/'}}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <form
            onSubmit={handleSubmit(loginApp)}
            className='login-form'>
            <div className="login-form__header">
              Member login
              <LinkButton to='/' name='&times;' className='login-form__header__right-button-close'/>
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
            <button
              type='submit'
              disabled={pristine || submitting}
              label='submit'>Submit</button>
          </form>
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.loginReducer.singInUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginApp: values => dispatch(loginToApp(values.email, values.password))
  }
}

const exportLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default reduxForm({
  form: 'login'
})(exportLoginForm)
