import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import TextField from '../../ComponentMaterial/TextField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { validateEmail, required } from '../../../validation'
import { addCustomersToDB } from '../../../actions'

import '../../../style/global-style/refactor-modal.less'
import './RefactorClients.less'

class AddClients extends React.Component {
  render () {
    const { handleSubmit, addUser, redirectBack } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/clients' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window modal-window-for-refactor'>
          <div className='refactor-clients basic-style-modal-refactor'>
            <div className="refactor-clients__header basic-style-header">
              Add Client
              <LinkButton to='/admin/clients' name='&times;' className='refactor-clients__header__right-button-close'/>
            </div>
            <form
              className='form-for-refactor'
              onSubmit={handleSubmit(addUser)}>
              <Field
                label='Your email'
                name='email'
                component={TextField}
                type='text'
                placeholder='Enter your email'
                validate={[validateEmail, required]}
                required
              />
              <Field
                label='Your name'
                name='name'
                component={TextField}
                type='text'
                placeholder='Enter your name'
                validate={[required]}
                required
              />
              <button
                className='basic-style-button'
                type='submit'
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
    redirectBack: state.customerReducer.redirectBackFromRefactor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: values => dispatch(addCustomersToDB(values))
  }
}

const exportAddClients = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClients)

export default reduxForm({
  form: 'addUser'
})(exportAddClients)
