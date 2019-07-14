import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { BrowserRouter as Router, Redirect} from 'react-router-dom';

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'

import './RefactorCities.less'


class EditCities extends React.Component {


  render () {

    const { handleSubmit, editCity } = this.props

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
              label='Enter city'
              name='email'
              component={myInput}
              type='text'
              placeholder='Enter your email'
            />
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

  }
}

const mapDispatchToProps = dispatch => {
  return {
    editCity: values => console.log(values)
  }
}

const exportEditCities = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCities)

export default reduxForm({
  form: 'editCity'
})(exportEditCities)
