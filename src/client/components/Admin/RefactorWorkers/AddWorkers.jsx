import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addMastersToDB } from '../../../actions'
import { required } from '../../../validation'

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
          <form
            onSubmit={handleSubmit(addWorker)}
            className='refactor-workers add-worker'>
            <div className="refactor-workers__header">
              Add Worker
              <LinkButton to='/admin/workers' name='&times;' className='refactor-workers__header__right-button-close'/>
            </div>
            <Field
              label='Enter workers name'
              name='name'
              component={myInput}
              validate={[required]}
              type='text'
              placeholder='Enter workers name'
            />
            <div className='refactor-workers__select'>
              <label>Enter city</label>
              <Field
                name='cityId'
                component='select'
                validate={[required]}
                type='text'
              >
                <option key={0} value='' disabled hidden>Choose city</option>
                {
                  chooseCities.map(item => (
                    <option key={item.id} value={item.id}>{item.city}</option>
                  ))
                }
              </Field>
            </div>
            <div className='refactor-workers__select'>
              <label>Enter rating</label>
              <Field
                name='rating'
                component='select'
                validate={[required]}
                type='text'
              >
                <option key={0} value='' disabled hidden>Choose Rating</option>
                <option key={1} value={1}>1</option>
                <option key={2} value={2}>2</option>
                <option key={3} value={3}>3</option>
                <option key={4} value={4}>4</option>
                <option key={5} value={5}>5</option>
              </Field>
            </div>
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
