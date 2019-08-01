import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { change, Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import Preloader from '../../App/Preloader/Preloader.jsx'
import { editClockIntoDB } from '../../../actions'
import { required } from '../../../validation'

import './RefactorClocks.less'
import axios from 'axios'

class EditClocks extends React.Component {
  state = {
    editModel: false,
    load: true
  }

  componentDidMount () {
    const id = +this.props.match.params.id
    axios
      .post(`http://localhost:3000/api/clocks/get`, { id })
      .then(res => {
        this.setState(() => ({
          editModel: res.data,
          load: false
        }
        ))
      })
      .catch(err => {
        console.log(err)
      })
  }
  render () {
    const { handleSubmit, editClock, redirectBack, dispatch } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/clocks' }}/>
    }

    if (this.state.editModel) {
      const { id, typeClock, timeRepair } = this.state.editModel
      dispatch(change('editClock', 'id', id))
      dispatch(change('editClock', 'typeClock', typeClock))
      dispatch(change('editClock', 'timeRepair', timeRepair))
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <form
            onSubmit={handleSubmit(editClock)}
            className='refactor-clocks'>
            <div className="refactor-clocks__header">
              Edit Clock
              <LinkButton to='/admin/clocks' name='&times;' className='refactor-clocks__header__right-button-close'/>
            </div>
            <Field
              label='ID'
              name='id'
              component={myInput}
              type='text'
              placeholder={this.props.match.params.id}
              input={{ disabled: true }}
            />
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
          {(this.state.load ? <Preloader/> : null)}
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
