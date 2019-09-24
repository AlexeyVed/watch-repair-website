import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'

import TextField from '../../ComponentMaterial/TextField/'
import SelectField from '../../ComponentMaterial/SelectField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import Preloader from '../../App/Preloader/Preloader.jsx'
import { editMastersIntoDB } from '../../../actions'
import { required } from '../../../validation'

import '../../../style/global-style/refactor-modal.less'
import './RefactorWorkers.less'
import axios from 'axios'

class EditWorkers extends React.Component {
  state = {
    load: true
  }

  componentDidMount () {
    const arr = this.props.location.pathname.split('/')
    axios
      .get(`/api/masters/${arr[arr.length - 1]}`)
      .then(res => {
        this.setState(() => ({
          load: false
        }
        ))
        this.props.dispatch(initialize('editWorker', res.data, ['id', 'name', 'rating', 'city']))
      })
      .catch(err => {
        console.log(err)
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
        <div className='modal-window modal-window-for-refactor'>
          <div className='refactor-workers basic-style-modal-refactor'>
            <div className="refactor-workers__header basic-style-header">
              Edit Worker
              <LinkButton to='/admin/workers' name='&times;' className='refactor-workers__header__right-button-close'/>
            </div>
            <form
              className='form-for-refactor'
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
                className='basic-style-button'
                type='submit'
                label='submit'>Submit
              </button>
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
    chooseCities: state.cityReducer.data,
    redirectBack: state.masterReducer.redirectBackFromRefactor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editWorker: values => dispatch(editMastersIntoDB(values))
  }
}

const exportEditWorkers = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWorkers)

export default reduxForm({
  form: 'editWorker'
})(exportEditWorkers)
