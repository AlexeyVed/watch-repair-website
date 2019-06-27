import React from 'react'

import {Field, reduxForm} from "redux-form";
import myInput from "../FieldRedux";
import {confirmEmail, confirmPassword, validateEmail, validatePassword} from "../../validation";
import './RefactorCities.less'
import {connect} from "react-redux";
import {toggleModalRegister} from "../../actions";


class RefactorCities extends React.Component {
  render () {

    const { handleSubmit } = this.props

    return (
      <div className=''>
        <form onSubmit={handleSubmit} className=''>
          <div className="">
            Refactor cities
          </div>
          <Field
            label='City id'
            name='id-city'
            component={myInput}
            type='text'
            placeholder='Enter city id'
            required
          />
          <Field
            label='City'
            name='City'
            component={myInput}
            type='text'
            placeholder='Enter city'
            required
          />

        </form>
      </div>
    )
  }
}

RefactorCities = connect(
  null,
  null
)(RefactorCities)

export default reduxForm({
  form: 'refactorCities',
  onSubmit: values => console.log(values)
})(RefactorCities)
