import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, initialize, reduxForm} from 'redux-form'
import { Redirect } from 'react-router-dom'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import Preloader from '../../App/Preloader/Preloader.jsx'
import { editOrderIntoDB } from '../../../actions'
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
        this.props.dispatch(initialize('editOrder', res.data, ['id', 'clientName', 'clientEmail', 'city', 'time']))
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
          <form
            onSubmit={handleSubmit(editOrder)}
            className='refactor-orders edit-order'>
            <div className="refactor-orders__header">
              Edit Order
              <LinkButton to='/admin/orders' name='&times;' className='refactor-orders__header__right-button-close'/>
            </div>
            <Field
              label='ID'
              name='id'
              component={myInput}
              type='text'
              placeholder={this.props.match.params.id}
              input={{ disabled: true }}
            />
            <Field
              label='Enter client name'
              name='clientName'
              component={myInput}
              validate={[required]}
              type='text'
              placeholder='Enter your name'
              required
            />
            <div className='refactor-orders__order-select'>
              <label>Choose client email</label>
              <Field
                name='clientEmail'
                component='select'
                validate={[required]}
                type='text'
              >
                <option key={0} value={false}>Choose email</option>
                {
                  chooseUsers.map((item, index) => (
                    <option key={index} value={item.email}>{item.email}</option>
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
                    <option key={index} value={item.idworker}>{item.name}</option>
                  ))
                }
              </Field>
            </div>
            <div className='refactor-orders__order-select'>
              <label>Choose time repair</label>
              <Field
                name='timeRepair'
                component='select'
                validate={[required]}
                type='text'
              >
                <option key={0} value={false}>Choose time repair</option>
                {
                  chooseClock.map((clock, index) => (
                    <option key={index} value={clock.timeRepair}>{clock.timeRepair}</option>
                  ))
                }
              </Field>
            </div>
            <div className='refactor-orders__order-select'>
              <label>Choose your city</label>
              <Field
                name='city'
                component='select'
                validate={[required]}
                type='text'
              >
                <option key={0} value={false}>Choose your city</option>
                {
                  chooseCities.map((item, index) => (
                    <option key={index}>{item.city}</option>
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
                <option key={0} value={false}>Select time</option>
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
          {(this.state.load ? <Preloader/> : null)}
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chooseClock: state.adminReducer.data.clocks,
    chooseCities: state.adminReducer.data.cities,
    chooseUsers: state.adminReducer.data.users,
    chooseWorkers: state.adminReducer.data.workers,
    redirectBack: state.adminReducer.redirectBackFromRefactor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editOrder: values => dispatch(editOrderIntoDB(values))
  }
}

const exportEditOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOrder)

export default reduxForm({
  form: 'editOrder'
})(exportEditOrder)
