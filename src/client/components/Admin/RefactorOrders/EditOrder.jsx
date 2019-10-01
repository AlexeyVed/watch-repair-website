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
    date: {
      date: '2019-05-30'
    }
  }

  componentDidMount () {
    const arr = this.props.location.pathname.split('/')
    const id = arr[arr.length - 1]
    this.props.getOrder(id)
      .then(res => {
        this.props.dispatch(initialize('editOrder', res, ['id', 'customerID', 'masterID', 'cityID', 'time']))
      })
    this.props.dispatch(initialize('editOrder', this.state.date, ['date']))
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
                label='Choose time repair'
                component={SelectField}
                validate={[required]}
                type='text'
              >
                {
                  chooseClock.map((clock, index) => (
                    <MenuItem key={index} value={clock.id}>{clock.timeRepair}</MenuItem>
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
                min='2019-05-30'
                value={ this.state.date.date }
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
