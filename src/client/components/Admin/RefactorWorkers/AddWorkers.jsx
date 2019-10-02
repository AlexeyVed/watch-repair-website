import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'

import TextField from '../../ComponentMaterial/TextField/'
import SelectField from '../../ComponentMaterial/SelectField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addMastersToDB } from '../../../actions'
import { required, validateOnlyLetter } from '../../../validation'

import './RefactorWorkers.less'

class AddWorkers extends React.Component {
  render () {
    const { handleSubmit, addWorker, chooseCities, redirectBack } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/workers' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <div className='refactor-workers add-worker'>
            <div className="refactor-workers__header">
              Add Worker
              <LinkButton to='/admin/workers' name='&times;' className='refactor-workers__header__right-button-close'/>
            </div>
            <form
              onSubmit={handleSubmit(addWorker)}>
              <Field
                label='Enter workers name'
                name='name'
                component={TextField}
                validate={[required, validateOnlyLetter]}
                type='text'
                placeholder='Enter workers name'
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
    addWorker: values => dispatch(addMastersToDB(values))
  }
}

const exportAddWorkers = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddWorkers)

export default reduxForm({
  form: 'addWorker'
})(exportAddWorkers)
