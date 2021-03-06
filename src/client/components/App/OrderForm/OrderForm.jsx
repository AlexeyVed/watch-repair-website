import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, initialize } from 'redux-form'
import MenuItem from '@material-ui/core/MenuItem'

import TextField from '../../ComponentMaterial/TextField/'
import SelectField from '../../ComponentMaterial/SelectField/'
import DateField from '../../ComponentMaterial/DateField/'
import { makeOrder } from '../../../actions'
import { validateEmail, required } from '../../../validation'
import { getDate } from '../../../helpers/dateForOrders.js'

import './OrderForm.less'

class OrderForm extends Component {
  state = {
    workHours: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    today: {
      date: new Date(),
      time: null
    }
  }

  componentDidMount () {
    const date = getDate()

    this.setState(() => ({
      workHours: this.state.workHours.filter(item => item >= date.time),
      today: date
    }))
    const initialValues = {
      date: date.dateToString,
      time: date.time
    }
    this.props.dispatch(initialize('orderForm', initialValues, ['date', 'time']))
  }

  render () {
    const { handleSubmit, chooseClock, chooseCities, makeOrder, chooseMaster } = this.props
    const { today, workHours } = this.state

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
            min={today.date}
            max= {new Date(today.date.getFullYear(), today.date.getMonth() + 6, 0)}
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
              workHours.map((item) => {
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
