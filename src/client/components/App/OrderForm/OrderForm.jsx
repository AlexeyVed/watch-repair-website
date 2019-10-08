import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, initialize } from 'redux-form'
import MenuItem from '@material-ui/core/MenuItem'

import TextField from '../../ComponentMaterial/TextField/'
import SelectField from '../../ComponentMaterial/SelectField/'
import DateField from '../../ComponentMaterial/DateField/'
import { makeOrder } from '../../../actions'
import { validateEmail, required } from '../../../validation'
import { getDate } from './logic.js'

import './OrderForm.less'

class OrderForm extends Component {
  state = {
    workHours: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    date: {
      date: null,
      time: null
    }
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
      }),
      date: date
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
            component={TextField}
            type='text'
            label='Enter your name'
            validate={required}
          />
          <Field
            label='Enter your email'
            name='email'
            component={TextField}
            type='text'
            placeholder='Enter your email'
            validate={[validateEmail, required]}
          />
          <Field
            name='clock_id'
            component={SelectField}
            id='clock'
            type='number'
            label='Choose your clock'
            validate={required}
          >
            {
              chooseClock.map((clock, index) => (
                <MenuItem key={index} value={clock.id}>{clock.name}</MenuItem>
              ))
            }
          </Field>
          <Field
            name='city_id'
            component={SelectField}
            id='city'
            label='Choose your city'
            type='number'
            validate={required}
          >
            {
              chooseCities.map((item, index) => (
                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
              ))
            }
          </Field>
          <Field
            label='Choose date'
            name='date'
            min={this.state.date.date}
            max='2019-12-30'
            component={DateField}
            type='date'
            onChange={() => {
              this.setState(() => ({
                workHours: [9, 10, 11, 12, 13, 14, 15, 16, 17]
              }))
            }}
          />
          <Field
            name='time'
            component={SelectField}
            id='time'
            label='Choose convenient time'
            type='number'
            validate={required}
          >
            {
              this.state.workHours.map((item) => {
                return <MenuItem key={item} value={Number(item)}>{item}:00</MenuItem>
              })
            }
          </Field>
          <button type='submit' label='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chooseClock: state.clockReducer.data,
    chooseCities: state.cityReducer.data,
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
