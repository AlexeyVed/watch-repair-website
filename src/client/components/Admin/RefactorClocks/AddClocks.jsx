import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import TextField from '../../ComponentMaterial/TextField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addClockToDB } from '../../../actions'
import { required } from '../../../validation'

import './RefactorClocks.less'

export class ModuleAddClocks extends React.Component {
  render () {
    const { handleSubmit, addClock, redirectBack } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/clocks' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <div className='refactor-clocks add-clock'>
            <div className="refactor-clocks__header">
              Add Clock
              <LinkButton to='/admin/clocks' name='&times;' className='refactor-clocks__header__right-button-close'/>
            </div>
            <form
              onSubmit={handleSubmit(addClock)}>
              <Field
                label='Enter type of clock'
                name='typeClock'
                component={TextField}
                validate={[required]}
                type='text'
                placeholder='Enter type of clock'
              />
              <Field
                label='Enter time of repair clock'
                name='timeRepair'
                component={TextField}
                validate={[required]}
                type='number'
                placeholder='Enter time repair clock'
              />
              <button
                type='submit'
                label='submit'>Submit</button>
            </form>
          </div>
        </div>
        , document.getElementById('modal-root') || document.createElement('div'))
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
)(ModuleAddClocks)

export default reduxForm({
  form: 'addClock'
})(exportAddClocks)
