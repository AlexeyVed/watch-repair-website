import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { BrowserRouter as Router, Redirect} from 'react-router-dom';

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'


import './RefactorClients.less'
import {confirmEmail, confirmPassword, validateEmail, validatePassword} from "../../../validation";


class EditClients extends React.Component {


  render () {

    const { handleSubmit, editCity } = this.props

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <form
            onSubmit={handleSubmit(editCity)}
            className='refactor-clients'>
            <div className="refactor-clients__header">
              Edit Clients
              <LinkButton to='/admin/clients' name='&times;' className='refactor-clients__header__right-button-close'/>
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
            <button
              type='submit'
              label='submit'>Submit</button>
          </form>
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    editCity: values => console.log(values)
  }
}

const exportEditClients = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClients)

export default reduxForm({
  form: 'editCity'
})(exportEditClients)
