import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import TextField from '../../ComponentMaterial/TextField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addCityToDB } from '../../../actions'
import { required } from '../../../validation'

import '../../../style/refactor-modal.less'

class AddCities extends React.Component {
  render () {
    const { handleSubmit, addCity, redirectBack } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/cities' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window-for-refactor'>
          <div className='refactor-model'>
            <div className='refactor-model__header'>
              Add city
              <LinkButton to='/admin/cities' name='&times;' className='refactor-model__header__right-button-close'/>
            </div>
            <form
              className='refactor-model__form'
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
                type='submit'
                label='submit'
                className='refactor-model__form__button-submit'>Submit</button>
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
