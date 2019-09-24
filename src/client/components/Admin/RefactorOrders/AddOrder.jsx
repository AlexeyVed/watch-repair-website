import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'

import SelectField from '../../ComponentMaterial/SelectField/'
import DateField from '../../ComponentMaterial/DateField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addOrdersToDB } from '../../../actions'
import { required } from '../../../validation'

import '../../../style/global-style/refactor-modal.less'
import './RefactorOrders.less'
import { getDate } from '../../App/OrderForm/logic'

class AddOrder extends React.Component {
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
    this.props.dispatch(initialize('addOrder', initialValues, ['date', 'time']))
  }

  render () {
    const { handleSubmit, addOrder, redirectBack, chooseClock, chooseCities, chooseUsers, chooseWorkers } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/orders' }}/>
    }

    const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]

    return (

      ReactDOM.createPortal(
        <div className='modal-window modal-window-for-refactor'>
          <div className='refactor-orders basic-style-modal-refactor'>
            <div className='refactor-orders__header basic-style-header'>
              Add Order
              <LinkButton to='/admin/orders' name='&times;' className='refactor-orders__header__right-button-close'/>
            </div>
            <form
              className='form-for-refactor'
              onSubmit={handleSubmit(addOrder)}>
              <Field
                name='customerId'
                id='customer'
                label='Choose client email'
                component={SelectField}
                validate={[required]}
                type='text'
              >
                {
                  chooseUsers.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.email}</MenuItem>
                  ))
                }
              </Field>
              <Field
                name='masterId'
                id='master'
                label='Choose master'
                component={SelectField}
                validate={[required]}
                type='text'
              >
                {
                  chooseWorkers.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                  ))
                }
              </Field>
              <Field
                name='clockId'
                id='clock'
                label='Choose your clock'
                component={SelectField}
                validate={[required]}
                type='text'
              >
                {
                  chooseClock.map((clock, index) => (
                    <MenuItem key={index} value={clock.id}>{clock.typeClock}</MenuItem>
                  ))
                }
              </Field>
              <Field
                name='cityId'
                id='city'
                label='Choose your city'
                component={SelectField}
                validate={[required]}
                type='text'
              >
                {
                  chooseCities.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.city}</MenuItem>
                  ))
                }
              </Field>
              <Field
                label='Choose date'
                name='date'
                min={this.state.date.date}
                max='2019-12-30'
                component={DateField}
                validate={[required]}
                type='date'
                onChange={() => {
                  this.setState(() => ({
                    workHours: [9, 10, 11, 12, 13, 14, 15, 16, 17]
                  }))
                }}
              />
              <Field
                name='time'
                id='clock'
                label='Choose convenient time'
                component={SelectField}
                validate={[required]}
                type='text'
              >
                {
                  workHours.map((item) => {
                    return <MenuItem key={item} value={item}>{item}:00</MenuItem>
                  })
                }
              </Field>
              <button
                className='basic-style-button'
                type='submit'
                label='submit'>Submit
              </button>
            </form>
          </div>
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chooseClock: state.clockReducer.data,
    chooseCities: state.cityReducer.data,
    chooseUsers: state.customerReducer.data,
    redirectBack: state.orderReducer.redirectBackFromRefactor,
    chooseWorkers: state.masterReducer.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrder: values => dispatch(addOrdersToDB(values))
  }
}

const exportAddOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrder)

export default reduxForm({
  form: 'addOrder'
})(exportAddOrder)
