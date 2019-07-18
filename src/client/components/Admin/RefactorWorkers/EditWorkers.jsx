import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { change, Field, reduxForm } from 'redux-form'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { editWorkerIntoDB } from '../../../actions'

import './RefactorWorkers.less'

class EditWorkers extends React.Component {
  componentDidMount () {
    this.props.dispatch(change('editWorker', 'id', this.props.match.params.idworker))
    this.props.dispatch(change('editWorker', 'name', this.props.match.params.name))
    this.props.dispatch(change('editWorker', 'city', this.props.match.params.city))
    this.props.dispatch(change('editWorker', 'rating', this.props.match.params.rating))
  }

  render () {
    const { handleSubmit, editWorker, chooseCities, redirectBack } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/workers' }}/>
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
              name='id'
              component={myInput}
              type='text'
              placeholder={this.props.match.params.idworker}
              input={{ disabled: true }}
            />
            <Field
              label='Update worker name'
              name='name'
              component={myInput}
              type='text'
              placeholder='Update worker name'
            />
            <div className='refactor-workers__select'>
              <label>Update city</label>
              <Field
                name='city'
                component='select'
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
    editWorker: values => dispatch(editWorkerIntoDB(values.name, values.city, values.rating, values.id))
  }
}

const exportEditWorkers = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWorkers)

export default reduxForm({
  form: 'editWorker'
})(exportEditWorkers)
