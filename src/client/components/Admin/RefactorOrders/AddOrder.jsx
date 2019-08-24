import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addOrdersToDB } from '../../../actions'
import { required } from '../../../validation'

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
        <div className='modal-window'>
          <div  className='refactor-orders'>
            <div className='refactor-orders__header'>
              Add Order
              <LinkButton to='/admin/orders' name='&times;' className='refactor-orders__header__right-button-close'/>
            </div>
            <form
              onSubmit={handleSubmit(addOrder)}>
              <div className='refactor-orders__order-select'>
                <label>Choose client email</label>
                <Field
                  name='customerId'
                  component='select'
                  validate={[required]}
                  type='text'
                >
                  <option key={0} value='' disabled hidden>Choose email</option>
                  {
                    chooseUsers.map((item, index) => (
                      <option key={index} value={item.id}>{item.email}</option>
                    ))
                  }
                </Field>
              </div>
              <div className='refactor-orders__order-select'>
                <label>Choose master</label>
                <Field
                  name='masterId'
                  component='select'
                  validate={[required]}
                  type='text'
                >
                  <option key={0} value='' disabled hidden>Choose master</option>
                  {
                    chooseWorkers.map((item, index) => (
                      <option key={index} value={item.id}>{item.name}</option>
                    ))
                  }
                </Field>
              </div>
              <div className='refactor-orders__order-select'>
                <label>Choose your clock</label>
                <Field
                  name='clockId'
                  component='select'
                  validate={[required]}
                  type='text'
                >
                  <option key={0} value='' disabled hidden>Choose your clock</option>
                  {
                    chooseClock.map((clock, index) => (
                      <option key={index} value={clock.id}>{clock.typeClock}</option>
                    ))
                  }
                </Field>
              </div>
              <div className='refactor-orders__order-select'>
                <label>Choose your city</label>
                <Field
                  name='cityId'
                  component='select'
                  validate={[required]}
                  type='text'
                >
                  <option key={0} value='' disabled hidden>Choose your city</option>
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
                min={ this.state.date.date }
                max={'2020-12-25'}
                component={myInput}
                validate={[required]}
                type='date'
                onChange={() => {
                  this.setState(() => ({
                    workHours: [9, 10, 11, 12, 13, 14, 15, 16, 17]
                  }))
                }}
              />
              <div className='refactor-orders__order-select'>
                <label>Choose convenient time</label>
                <Field
                  name='time'
                  component='select'
                  validate={[required]}
                  type='text'
                >
                  <option key={0} value='' disabled hidden>Select time</option>
                  {
                    workHours.map((item) => {
                      return <option key={item} value={item}>{item}:00</option>
                    })
                  }
                </Field>
              </div>
              <button
                type='submit'
                label='submit'>Submit</button>
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
