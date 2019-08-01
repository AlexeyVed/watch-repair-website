import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { change, Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import Preloader from '../../App/Preloader/Preloader.jsx'
import { editWorkerIntoDB } from '../../../actions'
import { required } from '../../../validation'

import './RefactorWorkers.less'
import axios from 'axios'

class EditWorkers extends React.Component {
  state = {
    editModel: false,
    load: true
  }

  componentDidMount () {
    const id = +this.props.match.params.idworker
    axios
      .post(`http://localhost:3000/api/workers/get`, { id })
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
    const { handleSubmit, editWorker, chooseCities, redirectBack, dispatch } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/workers' }}/>
    }

    if (this.state.editModel) {
      const { idworker, name, city, rating } = this.state.editModel
      dispatch(change('editWorker', 'idworker', idworker))
      dispatch(change('editWorker', 'name', name))
      dispatch(change('editWorker', 'city', city))
      dispatch(change('editWorker', 'rating', rating))
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <form
            onSubmit={handleSubmit(editWorker)}
            className='refactor-workers'>
            <div className="refactor-workers__header">
            Edit Worker
              <LinkButton to='/admin/workers' name='&times;' className='refactor-workers__header__right-button-close'/>
            </div>
            <Field
              label='ID'
              name='idworker'
              component={myInput}
              type='text'
              placeholder={this.props.match.params.idworker}
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
                name='city'
                component='select'
                validate={[required]}
                type='text'
              >
                <option key={0} value={false}>Choose city</option>
                {
                  chooseCities.map(item => (
                    <option key={item.id}>{item.city}</option>
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
                <option key={0} value={false}>Choose Rating</option>
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
          {(this.state.load ? <Preloader/> : null)}
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chooseCities: state.adminReducer.data.cities,
    redirectBack: state.adminReducer.redirectBackFromRefactor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editWorker: values => dispatch(editWorkerIntoDB(values))
  }
}

const exportEditWorkers = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWorkers)

export default reduxForm({
  form: 'editWorker'
})(exportEditWorkers)
