import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { validateEmail, required } from '../../../validation'
import { addCustomersToDB } from '../../../actions'

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
          <div className='refactor-clients'>
            <div className="refactor-clients__header">
              Add Client
              <LinkButton to='/admin/clients' name='&times;' className='refactor-clients__header__right-button-close'/>
            </div>
            <form
              onSubmit={handleSubmit(addUser)}>
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
                label='Your name'
                name='name'
                component={myInput}
                type='text'
                placeholder='Enter your name'
                validate={[required]}
                required
              />
              <button
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
