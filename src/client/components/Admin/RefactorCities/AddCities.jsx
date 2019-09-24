import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import TextField from '../../ComponentMaterial/TextField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addCityToDB } from '../../../actions'
import { required } from '../../../validation'

import '../../../style/global-style/refactor-modal.less'
import './RefactorCities.less'

class AddCities extends React.Component {
  render () {
    const { handleSubmit, addCity, redirectBack } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/cities' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window modal-window-for-refactor'>
          <div className='refactor-city basic-style-modal-refactor add-city'>
            <div className="refactor-city__header basic-style-header">
              Add city
              <LinkButton to='/admin/cities' name='&times;' className='refactor-city__header__right-button-close'/>
            </div>
            <form
              className='form-for-refactor'
              onSubmit={handleSubmit(addCity)}>
              <Field
                label='Enter city'
                name='city'
                component={TextField}
                validate={required}
                type='text'
                placeholder='Enter new city'
              />
              <button
                className='basic-style-button'
                type='submit'
                label='submit'
                className='refactor-city__submit'>Submit</button>
            </form>
          </div>
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    redirectBack: state.cityReducer.redirectBackFromRefactor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCity: values => dispatch(addCityToDB(values))
  }
}

const exportAddCities = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCities)

export default reduxForm({
  form: 'addCity'
})(exportAddCities)
