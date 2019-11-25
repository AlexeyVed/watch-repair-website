import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'

import TextField from '../../ComponentMaterial/TextField/'
import SelectField from '../../ComponentMaterial/SelectField/'
import DateField from '../../ComponentMaterial/DateField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { editOrdersIntoDB, getOrder } from '../../../actions'
import { required } from '../../../validation'

import '../../../style/refactor-modal.less'

class EditOrder extends React.Component {
  state = {
    today: new Date(),
    orderDate: new Date()
  }
  componentDidMount () {
    this.props.dispatch(initialize('editOrder', { date: this.state.orderDate }, ['date']))
    const arr = this.props.location.pathname.split('/')
    const id = arr[arr.length - 1]
    this.props.getOrder(id)
      .then(res => {
        this.setState(() => ({
          orderDate: new Date(res.date)
        }))
        this.props.dispatch(initialize('editOrder', res, ['id', 'customer_id', 'master_id', 'city_id', 'time']))
      })
  }

  render () {
    const { handleSubmit, editOrder, redirectBack, chooseClock, chooseCities, chooseUsers, chooseWorkers } = this.props
    const { today, orderDate } = this.state
    const arr = this.props.location.pathname.split('/')
    let min, max
    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/orders' }}/>
    }

    if (today.setHours(0, 0, 0, 0) > orderDate.setHours(0, 0, 0, 0)) {
      min = orderDate
      max = orderDate
    } else {
      min = today
      max = new Date(today.getFullYear(), today.getMonth() + 6, 0)
    }

    const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]

    return (

      ReactDOM.createPortal(
        <div className='modal-window-for-refactor'>
          <div className='refactor-model'>
            <div className='refactor-model__header'>
              Edit Order
              <LinkButton to='/admin/orders' name='&times;' className='refactor-model__header__right-button-close'/>
            </div>
            <form
              className='refactor-model__form'
              onSubmit={handleSubmit(editOrder)}>
              <Field
                label={`ID: ${arr[arr.length - 1]}`}
                name='id'
                component={TextField}
                type='text'
                input={{ disabled: true }}
              />
              <Field
                name='customer_id'
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
                name='master_id'
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
                name='clock_id'
                id='clock'
                label='Choose time repair'
                component={SelectField}
                validate={[required]}
                type='text'
              >
                {
                  chooseClock.map((clock, index) => (
                    <MenuItem key={index} value={clock.id}>{clock.name}</MenuItem>
                  ))
                }
              </Field>

              <Field
                name='city_id'
                id='city'
                label='Choose your city'
                component={SelectField}
                validate={[required]}
                type='text'
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
                min={ min }
                max={ max }
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
                    <MenuItem key={item} value={item}>{item}:00</MenuItem>
                  ))
                }
              </Field>
              <button
                className='refactor-model__form__button-submit'
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
    editOrder: values => dispatch(editOrdersIntoDB(values)),
    getOrder: id => dispatch(getOrder(id))
  }
}

const exportEditOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOrder)

export default reduxForm({
  form: 'editOrder'
})(exportEditOrder)
