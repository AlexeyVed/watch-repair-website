import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { change, Field, reduxForm } from 'redux-form'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { validateEmail, validatePassword } from '../../../validation'
import { editUserIntoDB } from '../../../actions'

import './RefactorClients.less'

class EditClients extends React.Component {
  componentDidMount () {
    this.props.dispatch(change('editClient', 'id', this.props.match.params.idlogin))
    this.props.dispatch(change('editClient', 'emailReg', this.props.match.params.email))
    this.props.dispatch(change('editClient', 'password', this.props.match.params.password))
  }

  render () {
    const { handleSubmit, editClient, redirectBack } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/clients' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <form
            onSubmit={handleSubmit(editClient)}
            className='refactor-clients edit-client'>
            <div className="refactor-clients__header">
              Edit Client
              <LinkButton to='/admin/clients' name='&times;' className='refactor-clients__header__right-button-close'/>
            </div>
            <Field
              label='ID'
              name='id'
              component={myInput}
              type='text'
              placeholder={this.props.match.params.idlogin}
              input={{ disabled: true }}
            />
            <Field
              label='Your email'
              name='emailReg'
              component={myInput}
              type='text'
              placeholder='Enter your email'
              validate={[validateEmail]}
              required
            />
            <Field
              label='Create a password'
              name='password'
              component={myInput}
              type='text'
              placeholder='Enter your password'
              validate={validatePassword}
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
    editClient: values => dispatch(editUserIntoDB(values.emailReg, values.password, values.id))
  }
}

const exportEditClients = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClients)

export default reduxForm({
  form: 'editClient'
})(exportEditClients)
