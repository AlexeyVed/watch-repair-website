import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import TextField from '../../ComponentMaterial/TextField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { editClockIntoDB, getClock } from '../../../actions'
import { required, validateOnlyLetter, validateTimeRepairClock } from '../../../validation'

import '../../../style/refactor-modal.less'

class EditClocks extends React.Component {
  componentDidMount () {
    const arr = this.props.location.pathname.split('/')
    const id = arr[arr.length - 1]
    this.props.getClock(id)
      .then(res => {
        this.props.dispatch(initialize('editClock', res, ['id', 'typeClock', 'timeRepair']))
      })
  }
  render () {
    const { handleSubmit, editClock, redirectBack } = this.props
    const arr = this.props.location.pathname.split('/')
    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/clocks' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window-for-refactor'>
          <div className='refactor-model'>
            <div className='refactor-model__header'>
              Edit Clock
              <LinkButton to='/admin/clocks' name='&times;' className='refactor-model__header__right-button-close'/>
            </div>
            <form
              className='refactor-model__form'
              onSubmit={handleSubmit(editClock)}>
              <Field
                label={`ID: ${arr[arr.length - 1]}`}
                name='id'
                component={TextField}
                type='text'
                input={{ disabled: true }}
              />
              <Field
                label='Enter type of clock'
                name='typeClock'
                component={TextField}
                validate={[required, validateOnlyLetter]}
                type='text'
                placeholder='Enter type of clock'
              />
              <Field
                label='Enter time of repair clock'
                name='timeRepair'
                component={TextField}
                validate={[required, validateTimeRepairClock]}
                inputProps={{ min: '1', max: '12', step: '1' }}
                type='number'
                placeholder='Enter time repair clock'
              />
              <button
                className='refactor-model__form__button-submit'
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
    redirectBack: state.clockReducer.redirectBackFromRefactor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editClock: values => dispatch(editClockIntoDB(values)),
    getClock: id => dispatch(getClock(id))
  }
}

const exportEditClocks = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClocks)

export default reduxForm({
  form: 'editClock'
})(exportEditClocks)
