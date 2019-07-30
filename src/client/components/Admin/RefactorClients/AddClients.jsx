import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { confirmEmail, confirmPassword, validateEmail, validatePassword, required } from '../../../validation'
import { addUserToDB } from '../../../actions'

import './RefactorClients.less'

class AddClients extends React.Component {
  render () {
    const { handleSubmit, addUser, redirectBack } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/clients' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <form
            onSubmit={handleSubmit(addUser)}
            className='refactor-clients'>
            <div className="refactor-clients__header">
              Add Client
              <LinkButton to='/admin/clients' name='&times;' className='refactor-clients__header__right-button-close'/>
            </div>
            <Field
              label='Your email'
              name='email'
              component={myInput}
              type='text'
              placeholder='Enter your email'
              validate={[validateEmail, required]}
              required
            />
            <Field
              label='Confirm your email'
              name='confirm-email-reg'
              component={myInput}
              type='text'
              placeholder='Confirm your email'
              validate={[validateEmail, confirmEmail, required]}
              required
            />
            <Field
              label='Create a password'
              name='password'
              component={myInput}
              type='password'
              placeholder='Enter your password'
              validate={[validatePassword, required]}
              required
            />
            <Field
              label='Confirm your password'
              name='confirm-password'
              component={myInput}
              type='password'
              placeholder='Confirm your password'
              validate={[confirmPassword, required]}
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
    redirectBack: state.adminReducer.redirectBackFromRefactor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: values => dispatch(addUserToDB(values))
  }
}

const exportAddClients = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClients)

export default reduxForm({
  form: 'addUser'
})(exportAddClients)
