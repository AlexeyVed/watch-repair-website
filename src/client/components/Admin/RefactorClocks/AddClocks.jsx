import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addClockToDB } from '../../../actions'

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
            className='refactor-clocks'>
            <div className="refactor-clocks__header">
              Add Clocks
              <LinkButton to='/admin/clocks' name='&times;' className='refactor-clocks__header__right-button-close'/>
            </div>
            <Field
              label='Enter type of clock'
              name='typeClock'
              component={myInput}
              type='text'
              placeholder='Enter type of clock'
            />
            <Field
              label='Enter time of repair clock'
              name='timeRepair'
              component={myInput}
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
    redirectBack: state.adminReducer.redirectBackFromRefactor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addClock: values => dispatch(addClockToDB(values.typeClock, values.timeRepair))
  }
}

const exportAddClocks = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClocks)

export default reduxForm({
  form: 'addClock'
})(exportAddClocks)
