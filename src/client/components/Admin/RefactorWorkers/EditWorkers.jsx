import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import Preloader from '../../App/Preloader/Preloader.jsx'
import { editMastersIntoDB } from '../../../actions'
import { required } from '../../../validation'

import './RefactorWorkers.less'
import axios from 'axios'

class EditWorkers extends React.Component {
  state = {
    load: true
  }

  componentDidMount () {
    const id = +this.props.match.params.id
    axios
      .get(`/api/masters/id?id=${id}`)
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

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/workers' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <div className='refactor-workers'>
            <div className="refactor-workers__header">
              Edit Worker
              <LinkButton to='/admin/workers' name='&times;' className='refactor-workers__header__right-button-close'/>
            </div>
            <form
              onSubmit={handleSubmit(editWorker)}>
              <Field
                label='ID'
                name='id'
                component={myInput}
                type='text'
                placeholder={this.props.match.params.id}
                input={{ disabled: true }}
              />
              <Field
                label='Update worker name'
                name='name'
                component={myInput}
                validate={[required]}
                type='text'
                placeholder='Update worker name'
              />
              <div className='refactor-workers__select'>
                <label>Update city</label>
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
                <label>Update rating</label>
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
