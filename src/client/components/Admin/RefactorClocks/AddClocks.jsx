import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import TextField from '../../ComponentMaterial/TextField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addClockToDB } from '../../../actions'
import { required, validateOnlyLetter, validateTimeRepairClock } from '../../../validation'

import '../../../style/refactor-modal.less'

class AddClocks extends React.Component {
  render () {
    const { handleSubmit, addClock, redirectBack } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/clocks' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window-for-refactor'>
          <div className='refactor-model'>
            <div className='refactor-model__header'>
              Add Clock
              <LinkButton to='/admin/clocks' name='&times;' className='refactor-model__header__right-button-close'/>
            </div>
            <form
              className='refactor-model__form'
              onSubmit={handleSubmit(addClock)}>
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
    addClock: values => dispatch(addClockToDB(values))
  }
}

const exportAddClocks = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClocks)

export default reduxForm({
  form: 'addClock'
})(exportAddClocks)
