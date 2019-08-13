import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, initialize } from 'redux-form'

import myInput from '../../FieldRedux'
import { makeOrder } from '../../../actions'
import { validateEmail, required } from '../../../validation'
import { getDate } from './logic.js'

import './OrderForm.less'

class OrderForm extends Component {
  state = {
    workHours: [9, 10, 11, 12, 13, 14, 15, 16, 17]
  }

  componentDidMount () {
    const date = getDate()

    this.setState(() => ({
      workHours: this.state.workHours.filter(item => {
        if (item >= date.time) {
          return true
        } else {
          return false
        }
      })
    }))
    const initialValues = {
      date: date.date,
      time: date.time
    }
    this.props.dispatch(initialize('orderForm', initialValues, ['date', 'time']))
  }

  render () {
    const { handleSubmit, chooseClock, chooseCities, makeOrder, chooseMaster } = this.props

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
            name='name'
            component={myInput}
            type='text'
            placeholder='Enter your name'
            validate={required}
          />
          <Field
            label='Enter your email'
            name='email'
            component={myInput}
            type='text'
            placeholder='Enter your email'
            validate={[validateEmail, required]}
          />
          <div className='main-form__order-select'>
            <label>Choose your clock</label>
            <Field
              name='clockId'
              component='select'
              type='number'
              validate={required}
            >
              <option key={0} value={false}>Choose your clock</option>
              {
                chooseClock.map((clock, index) => (
                  <option key={index} value={clock.id}>{clock.typeClock}</option>
                ))
              }
            </Field>
          </div>
          <div className='main-form__order-select'>
            <label>Choose your city</label>
            <Field
              name='cityId'
              component='select'
              type='text'
              validate={required}
            >
              <option key={0} value={undefined}>Choose your city</option>
              {
                chooseCities.map((item, index) => (
                  <option key={index} value={item.id}>{item.city}</option>
                ))
              }
            </Field>
          </div>
          <Field
            label='Choose date'
            name='date'
            component={myInput}
            type='date'
          />
          <div className='main-form__order-select'>
            <label>Choose convenient time</label>
            <Field
              name='time'
              component='select'
              type='number'
              validate={required}
            >
              {
                this.state.workHours.map((item) => {
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
