import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import Preloader from '../../App/Preloader/Preloader.jsx'
import { validateEmail, validatePassword, required } from '../../../validation'
import { editUserIntoDB } from '../../../actions'

import './RefactorClients.less'
import axios from 'axios'

class EditClients extends React.Component {
  state = {
    load: true
  }

  componentDidMount () {
    const id = +this.props.match.params.idlogin
    axios
      .post(`http://localhost:3000/api/users/get`, { id })
      .then(res => {
        this.setState(() => ({
            load: false
          }
        ))
        this.props.dispatch(initialize('editClient', res.data, ['idlogin', 'email', 'password']))
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    const { handleSubmit, editClient, redirectBack, dispatch } = this.props

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
              name='idlogin'
              component={myInput}
              type='text'
              placeholder={this.props.match.params.idlogin}
              input={{ disabled: true }}
            />
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
              label='Create a password'
              name='password'
              component={myInput}
              type='text'
              placeholder='Enter your password'
              validate={[validatePassword, required]}
              required
            />
            <button
              type='submit'
              label='submit'>Submit</button>
          </form>
          {(this.state.load ? <Preloader/> : null)}
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
    editClient: values => dispatch(editUserIntoDB(values))
  }
}

const exportEditClients = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClients)

export default reduxForm({
  form: 'editClient'
})(exportEditClients)
