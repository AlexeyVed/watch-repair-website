import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'

import TextField from '../../ComponentMaterial/TextField/'
import SelectField from '../../ComponentMaterial/SelectField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { editMastersIntoDB, getMaster } from '../../../actions'
import { required } from '../../../validation'

import '../../../style/refactor-modal.less'

class EditWorkers extends React.Component {
  componentDidMount () {
    const arr = this.props.location.pathname.split('/')
    const id = arr[arr.length - 1]
    this.props.getMaster(id)
      .then(res => {
        this.props.dispatch(initialize('editWorker', res, ['id', 'name', 'rating', 'city']))
      })
  }

  render () {
    const { handleSubmit, editWorker, chooseCities, redirectBack } = this.props
    const arr = this.props.location.pathname.split('/')
    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/workers' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window-for-refactor'>
          <div className='refactor-model'>
            <div className='refactor-model__header'>
              Edit Worker
              <LinkButton to='/admin/workers' name='&times;' className='refactor-model__header__right-button-close'/>
            </div>
            <form
              className='refactor-model__form'
              onSubmit={handleSubmit(editWorker)}>
              <Field
                label={`ID: ${arr[arr.length - 1]}`}
                name='id'
                component={TextField}
                type='text'
                input={{ disabled: true }}
              />
              <Field
                label='Update worker name'
                name='name'
                component={TextField}
                validate={[required]}
                type='text'
                placeholder='Update worker name'
              />
              <Field
                name='cityId'
                id='city'
                label='Enter city'
                component={SelectField}
                validate={[required]}
                type='text'
              >
                {
                  chooseCities.map(item => (
                    <MenuItem key={item.id} value={item.id}>{item.city}</MenuItem>
                  ))
                }
              </Field>
              <Field
                name='rating'
                id='rating'
                label='Choose rating'
                component={SelectField}
                validate={[required]}
                type='number'
              >
                <MenuItem key={1} value={1}>1</MenuItem>
                <MenuItem key={2} value={2}>2</MenuItem>
                <MenuItem key={3} value={3}>3</MenuItem>
                <MenuItem key={4} value={4}>4</MenuItem>
                <MenuItem key={5} value={5}>5</MenuItem>
              </Field>
              <button
                className='refactor-model__form__button-submit'
                type='submit'
                label='submit'>Submit
              </button>
            </form>
          </div>
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chooseCities: state.cityReducer.data,
    redirectBack: state.masterReducer.redirectBackFromRefactor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editWorker: values => dispatch(editMastersIntoDB(values)),
    getMaster: id => dispatch(getMaster(id))
  }
}

const exportEditWorkers = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWorkers)

export default reduxForm({
  form: 'editWorker'
})(exportEditWorkers)
