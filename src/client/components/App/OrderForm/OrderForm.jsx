import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import axios from 'axios'

import myInput from '../../FieldRedux'
import { setCitiesToState, setClocksToState } from '../../../actions'
import { validateEmail } from '../../../validation'

import './OrderForm.less'

class OrderForm extends Component {
  componentDidMount () {
    const { setCities, setClock } = this.props

    axios.get(`http://localhost:4000/getData`)
      .then(res => {
        setCities(res.data[0])
        setClock(res.data[1])
      })
  }

  render () {
    const { handleSubmit, chooseClock, chooseCities, showState } = this.props

    return (
      <div className='main-form'>
        <div className='main-form__title'>Make you order</div>
        <form
          onSubmit={handleSubmit}
          className='main-form__order-form'>
          <Field
            label='Enter your name'
            name='name'
            component={myInput}
            type='text'
            placeholder='Enter your name'
          />
          <Field
            label='Enter your email'
            name='email'
            component={myInput}
            type='text'
            placeholder='Enter your email'
            validate={validateEmail}
          />
          <div className='main-form__order-select'>
            <label>Choose your clock</label>
            <Field
              name='clock'
              component='select'
              type='text'
            >
              <option key={0} value={false}>Choose your clock</option>
              {
                chooseClock.map((clock, index) => (
                  <option key={index} value={clock.timeRepair}>{clock.typeClock}</option>
                ))
              }
            </Field>
          </div>
          <div className='main-form__order-select'>
            <label>Choose your city</label>
            <Field
              name='city'
              component='select'
              type='text'
            >
              <option key={0} value={false}>Choose your city</option>
              {
                chooseCities.map((city, index) => (
                  <option key={index}>{city}</option>
                ))
              }
            </Field>
          </div>
          <button type='submit' label='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chooseClock: state.appReducer.orderFormData.clocks,
    chooseCities: state.appReducer.orderFormData.cities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCities: data => dispatch(setCitiesToState(data)),
    setClock: data => dispatch(setClocksToState(data))
  }
}

OrderForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderForm)

export default reduxForm({
  form: 'order',
  onSubmit: values => console.log(values)
})(OrderForm)
