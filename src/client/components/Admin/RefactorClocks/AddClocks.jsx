import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { Placeholder } from 'react-preloading-screen'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addClockToDB } from '../../../actions'
import { required } from '../../../validation'

import './RefactorClocks.less'

class AddClocks extends React.Component {
  render () {
    const { handleSubmit, addClock, redirectBack, isRefactor } = this.props
    let loader

    if (isRefactor) {
      loader = <Placeholder>
        <div className='preloader'>
          <div className='loader'>
          </div>
        </div>
      </Placeholder>
    } else {
      loader = null
    }

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
            {loader}
          </form>
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    redirectBack: state.adminReducer.redirectBackFromRefactor,
    isRefactor: state.adminReducer.refactorModelInProcess
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
