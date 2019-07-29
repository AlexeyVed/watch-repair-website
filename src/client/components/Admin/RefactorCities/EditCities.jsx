import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, change } from 'redux-form'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { editCityIntoDB } from '../../../actions'

import './RefactorCities.less'
import {Placeholder} from "react-preloading-screen"
import {required} from "../../../validation"

class EditCities extends React.Component {
  componentDidMount () {
    this.props.dispatch(change('editCity', 'id', this.props.match.params.id))
    this.props.dispatch(change('editCity', 'city', this.props.match.params.city))
  }

  render () {
    const { handleSubmit, editCity, redirectBack, isRefactor } = this.props
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
      return <Redirect to={{ pathname: '/admin/cities' }}/>
    }

    return (
      ReactDOM.createPortal(
        <div className='modal-window'>
          <form
            onSubmit={handleSubmit(editCity)}
            className='refactor-city'>
            <div className="refactor-city__header">
              Edit city
              <LinkButton to='/admin/cities' name='&times;' className='refactor-city__header__right-button-close'/>
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
              label='Enter city'
              name='city'
              component={myInput}
              validate={required}
              type='text'
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
    editCity: values => dispatch(editCityIntoDB(values))
  }
}

const exportEditCities = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCities)

export default reduxForm({
  form: 'editCity'
})(exportEditCities)
