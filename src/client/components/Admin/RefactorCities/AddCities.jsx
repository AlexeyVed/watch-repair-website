import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addCityToDB } from '../../../actions'
import { required } from '../../../validation'

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
          <form
            onSubmit={handleSubmit(addCity)}
            className='refactor-city add-city'>
            <div className="refactor-city__header">
              Add city
              <LinkButton to='/admin/cities' name='&times;' className='refactor-city__header__right-button-close'/>
            </div>
            <Field
              label='Enter city'
              name='city'
              component={myInput}
              validate={required}
              type='text'
              placeholder='Enter new city'
            />
            <button
              type='submit'
              label='submit'
              className='refactor-city__submit'>Submit</button>
          </form>
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    redirectBack: state.appReducer.redirectBackFromRefactor
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
