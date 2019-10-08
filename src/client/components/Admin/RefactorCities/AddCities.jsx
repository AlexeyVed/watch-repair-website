import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import TextField from '../../ComponentMaterial/TextField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addCityToDB } from '../../../actions'
import { required, validateOnlyLetter } from '../../../validation'

import './RefactorCities.less'

class AddCities extends React.Component {
  render () {
    const { handleSubmit, addCity, redirectBack } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/cities' }}/>
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <div className='refactor-city add-city'>
            <div className="refactor-city__header">
              Add city
              <LinkButton to='/admin/cities' name='&times;' className='refactor-city__header__right-button-close'/>
            </div>
            <form
              onSubmit={handleSubmit(addCity)}>
              <Field
                label='Enter city'
                name='name'
                component={TextField}
                validate={[required, validateOnlyLetter]}
                type='text'
                placeholder='Enter new city'
              />
              <button
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
