import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import Preloader from '../../App/Preloader/Preloader.jsx'
import { validateEmail, required } from '../../../validation'
import { editCustomersIntoDB } from '../../../actions'

import './RefactorClients.less'
import axios from 'axios'

class EditClients extends React.Component {
  state = {
    load: true
  }

  componentDidMount () {
    const id = +this.props.match.params.id
    axios
      .post(`http://localhost:3000/api/customers/get`, { id })
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

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/clients' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <div className='refactor-clients edit-client'>
            <div className="refactor-clients__header">
              Edit Client
              <LinkButton to='/admin/clients' name='&times;' className='refactor-clients__header__right-button-close'/>
            </div>
            <form
              onSubmit={handleSubmit(editClient)}>
              <Field
                label='ID'
                name='id'
                component={myInput}
                type='text'
                placeholder={this.props.match.params.id}
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
                name='name'
                component={myInput}
                type='text'
                placeholder='Enter your password'
                validate={[required]}
                required
              />
              <button
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
