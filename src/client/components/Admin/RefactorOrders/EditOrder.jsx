import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { getDate } from '../../App/OrderForm/logic'

import TextField from '../../ComponentMaterial/TextField/'
import SelectField from '../../ComponentMaterial/SelectField/'
import DateField from '../../ComponentMaterial/DateField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import Preloader from '../../App/Preloader/Preloader.jsx'
import { editOrdersIntoDB } from '../../../actions'
import { required } from '../../../validation'

import './RefactorOrders.less'
import axios from 'axios'

class EditOrder extends React.Component {
  state = {
    workHours: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    date: {
      date: null,
      time: null
    },
    load: true
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

    const arr = this.props.location.pathname.split('/')
    axios
      .get(`/api/orders/${arr[arr.length - 1]}`)
      .then(res => {
        this.setState(() => ({
          load: false
        }
        ))
        this.props.dispatch(initialize('editOrder', res.data, ['id', 'customerID', 'masterID', 'cityID', 'time']))
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    const { handleSubmit, editOrder, redirectBack, chooseClock, chooseCities, chooseUsers, chooseWorkers } = this.props
    const arr = this.props.location.pathname.split('/')
    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/orders' }}/>
    }

    const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <div className='refactor-orders edit-order'>
            <div className="refactor-orders__header">
              Edit Order
              <LinkButton to='/admin/orders' name='&times;' className='refactor-orders__header__right-button-close'/>
            </div>
            <form
              onSubmit={handleSubmit(editOrder)}>
              <Field
                label='ID'
                name='id'
                component={TextField}
                type='text'
                placeholder={arr[arr.length - 1]}
                input={{ disabled: true }}
              />
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
                    <option key={index} value={item.id}>{item.email}</option>
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
                    <option key={index} value={item.id}>{item.name}</option>
                  ))
                }
              </Field>
              <Field
                name='clockId'
                id='clock'
                label='Choose time repair'
                component={SelectField}
                validate={[required]}
                type='text'
              >
                {
                  chooseClock.map((clock, index) => (
                    <option key={index} value={clock.id}>{clock.timeRepair}</option>
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
                    <option key={index} value={item.id}>{item.city}</option>
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
              />
              <Field
                name='time'
                id='time'
                label='Choose convenient time'
                component={SelectField}
                validate={[required]}
                type='text'
              >
                {
                  workHours.map((item) => (
                    <option key={item} value={item}>{item}:00</option>
                  ))
                }
              </Field>
              <button
                type='submit'
                label='submit'>Submit
              </button>
            </form>
          </div>
          {(this.state.load ? <Preloader/> : null)}
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
    editOrder: values => dispatch(editOrdersIntoDB(values))
  }
}

const exportEditOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOrder)

export default reduxForm({
  form: 'editOrder'
})(exportEditOrder)
