import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import { addOrderToDB } from '../../../actions'
import { required } from '../../../validation'

import './RefactorOrders.less'
import { getDate } from "../../App/OrderForm/logic";

class AddOrder extends React.Component {
  componentDidMount() {
    const date = getDate()

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
          <form
            onSubmit={handleSubmit(addOrder)}
            className='refactor-orders'>
            <div className="refactor-orders__header">
              Add Order
              <LinkButton to='/admin/orders' name='&times;' className='refactor-orders__header__right-button-close'/>
            </div>
            <div className='refactor-orders__order-select'>
              <label>Choose client email</label>
              <Field
                name='customerID'
                component='select'
                validate={[required]}
                type='text'
              >
                <option key={0} value={false}>Choose email</option>
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
                name='masterID'
                component='select'
                validate={[required]}
                type='text'
              >
                <option key={0} value={false}>Choose master</option>
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
                name='clockID'
                component='select'
                validate={[required]}
                type='text'
              >
                <option key={0} value={false}>Choose your clock</option>
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
                name='cityID'
                component='select'
                validate={[required]}
                type='text'
              >
                <option key={0} value={false}>Choose your city</option>
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
              validate={[required]}
              type='date'
            />
            <div className='refactor-orders__order-select'>
              <label>Choose convenient time</label>
              <Field
                name='time'
                component='select'
                validate={[required]}
                type='text'
              >
                <option key={0}>Select time</option>
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
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chooseClock: state.adminReducer.data.clocks,
    chooseCities: state.adminReducer.data.cities,
    chooseUsers: state.adminReducer.data.customers,
    redirectBack: state.adminReducer.redirectBackFromRefactor,
    chooseWorkers: state.adminReducer.data.workers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrder: values => dispatch(addOrderToDB(values))
  }
}

const exportAddOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrder)

export default reduxForm({
  form: 'addOrder'
})(exportAddOrder)
