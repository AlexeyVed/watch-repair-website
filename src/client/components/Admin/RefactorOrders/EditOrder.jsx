import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import Preloader from '../../App/Preloader/Preloader.jsx'
import { editOrdersIntoDB } from '../../../actions'
import { required } from '../../../validation'

import './RefactorOrders.less'
import axios from 'axios'

class EditOrder extends React.Component {
  state = {
    load: true
  }

  componentDidMount () {
    const id = +this.props.match.params.id
    axios
      .post(`http://localhost:3000/api/orders/get`, { id })
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
                component={myInput}
                type='text'
                placeholder={this.props.match.params.id}
                input={{ disabled: true }}
              />
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
                <label>Choose time repair</label>
                <Field
                  name='clockId'
                  component='select'
                  validate={[required]}
                  type='text'
                >
                  <option key={0} value='' disabled hidden>Choose time repair</option>
                  {
                    chooseClock.map((clock, index) => (
                      <option key={index} value={clock.id}>{clock.timeRepair}</option>
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
                  <option key={0} value='' disabled hidden>Select time</option>
                  {
                    workHours.map((item) => (
                      <option key={item} value={item}>{item}:00</option>
                    ))
                  }
                </Field>
              </div>
              <button
                type='submit'
                label='submit'>Submit</button>
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
