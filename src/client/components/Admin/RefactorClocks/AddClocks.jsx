import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addClockToDB } from '../../../actions'
import { required } from '../../../validation'

import './RefactorClocks.less'

class AddClocks extends React.Component {
  render () {
    const { handleSubmit, addClock, redirectBack } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/clocks' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <form
            onSubmit={handleSubmit(addClock)}
            className='refactor-clocks add-clock'>
            <div className="refactor-clocks__header">
              Add Clock
              <LinkButton to='/admin/clocks' name='&times;' className='refactor-clocks__header__right-button-close'/>
            </div>
            <Field
              label='Enter type of clock'
              name='typeClock'
              component={myInput}
              validate={[required]}
              type='text'
              placeholder='Enter type of clock'
            />
            <Field
              label='Enter time of repair clock'
              name='timeRepair'
              component={myInput}
              validate={[required]}
              type='number'
              placeholder='Enter time repair clock'
            />
            <button
              type='submit'
              label='submit'>Submit</button>
          </form>
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    redirectBack: state.appReducer.redirectBackFromRefactor
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
