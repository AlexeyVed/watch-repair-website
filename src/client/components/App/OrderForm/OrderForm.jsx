import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, change } from 'redux-form'

import myInput from '../../FieldRedux'
import { makeOrder } from '../../../actions'
import { validateEmail, required } from '../../../validation'

import './OrderForm.less'

class OrderForm extends Component {
  render () {
    const { handleSubmit, chooseClock, chooseCities, makeOrder, currentEmail, chooseMaster } = this.props

    if (currentEmail) {
      this.props.dispatch(change('orderForm', 'clientEmail', currentEmail))
    }

    const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]

    if (chooseMaster) {
      return (
        <div className='main-form'>
          <div className='choosing-master'>
            Please, choose a free master.

          </div>
        </div>
      )
    }

    return (
      <div className='main-form'>
        <div className='main-form__title'>Make you order</div>
        <form
          onSubmit={handleSubmit(makeOrder)}
          className='main-form__order-form'>
          <Field
            label='Enter your name'
            name='clientName'
            component={myInput}
            type='text'
            placeholder='Enter your name'
            validate={required}
          />
          <Field
            label='Enter your email'
            name='clientEmail'
            component={myInput}
            type='text'
            placeholder='Enter your email'
            validate={[validateEmail, required]}
          />
          <div className='main-form__order-select'>
            <label>Choose your clock</label>
            <Field
              name='timeRepair'
              component='select'
              type='number'
              validate={required}
            >
              <option key={0} value={undefined}>Choose your clock</option>
              {
                chooseClock.map((clock, index) => (
                  <option key={index} value={Number(clock.timeRepair)}>{clock.typeClock}</option>
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
              validate={required}
            >
              <option key={0} value={undefined}>Choose your city</option>
              {
                chooseCities.map((item, index) => (
                  <option key={index}>{item.city}</option>
                ))
              }
            </Field>
          </div>
          <Field
            label='Choose date'
            name='date'
            component={myInput}
            type='date'
            validate={required}
          />
          <div className='main-form__order-select'>
            <label>Choose convenient time</label>
            <Field
              name='time'
              component='select'
              type='number'
              validate={required}
            >
              <option key={0} value={undefined}>Select time</option>
              {
                workHours.map((item) => {
                  return <option key={item} value={Number(item)}>{item}:00</option>
                })
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
    chooseClock: state.adminReducer.data.clocks,
    chooseCities: state.adminReducer.data.cities,
    currentEmail: state.loginReducer.singInUser,
    chooseMaster: state.appReducer.chooseWorker
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeOrder: values => dispatch(makeOrder(values))
  }
}

const exportOrderForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderForm)

export default reduxForm({
  form: 'orderForm'
})(exportOrderForm)
