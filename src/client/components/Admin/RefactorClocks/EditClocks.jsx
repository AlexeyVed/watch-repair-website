import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import TextField from '../../ComponentMaterial/TextField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import Preloader from '../../App/Preloader/Preloader.jsx'
import { editClockIntoDB } from '../../../actions'
import { required, validateOnlyLetter, validateTimeRepairClock } from '../../../validation'

import '../../../style/refactor-modal.less'

class EditClocks extends React.Component {
  state = {
    load: true
  }

  componentDidMount () {
    const arr = this.props.location.pathname.split('/')
    axios
      .get(`/api/clocks/${arr[arr.length - 1]}`)
      .then(res => {
        this.setState(() => ({
          load: false
        }
        ))
        this.props.dispatch(initialize('editClock', res.data, ['id', 'typeClock', 'timeRepair']))
      })
      .catch(err => {
        console.log(err)
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
          {(this.state.load ? <Preloader/> : null)}
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
    editClock: values => dispatch(editClockIntoDB(values))
  }
}

const exportEditClocks = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClocks)

export default reduxForm({
  form: 'editClock'
})(exportEditClocks)
