import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import TextField from '../../ComponentMaterial/TextField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import Preloader from '../../App/Preloader/Preloader.jsx'
import { validateEmail, required } from '../../../validation'
import { editCustomersIntoDB } from '../../../actions'

import '../../../style/refactor-modal.less'

class EditClients extends React.Component {
  state = {
    load: true
  }

  componentDidMount () {
    const arr = this.props.location.pathname.split('/')
    axios
      .get(`/api/customers/${arr[arr.length - 1]}`)
      .then(res => {
        this.setState(() => ({
          load: false
        }
        ))
        this.props.dispatch(initialize('editClient', res.data, ['id', 'email', 'name']))
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    const { handleSubmit, editClient, redirectBack } = this.props
    const arr = this.props.location.pathname.split('/')
    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/clients' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window-for-refactor'>
          <div className='refactor-model'>
            <div className='refactor-model__header'>
              Edit Client
              <LinkButton to='/admin/clients' name='&times;' className='refactor-model__header__right-button-close'/>
            </div>
            <form
              className='refactor-model__form'
              onSubmit={handleSubmit(editClient)}>
              <Field
                label={`ID: ${arr[arr.length - 1]}`}
                name='id'
                component={TextField}
                type='text'
                input={{ disabled: true }}
              />
              <Field
                label='Enter email'
                name='email'
                component={TextField}
                type='text'
                placeholder='Enter your email'
                validate={[validateEmail, required]}
                required
              />
              <Field
                label='Enter name'
                name='name'
                component={TextField}
                type='text'
                placeholder='Enter your password'
                validate={[required]}
                required
              />
              <button
                className='refactor-model__form__button-submit'
                type='submit'
                label='submit'>Submit</button>
            </form>
          </div>
          {(this.state.load ? <Preloader/> : null)}
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
    editClient: values => dispatch(editCustomersIntoDB(values))
  }
}

const exportEditClients = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClients)

export default reduxForm({
  form: 'editClient'
})(exportEditClients)
