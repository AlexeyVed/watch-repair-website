import React from 'react'
import { ModuleWindowAdmin, mapDispatchToProps, mapStateToProps } from '../ModalWindowAdmin.jsx'

describe('Testing modal admin', () => {
  test('Render modal window', () => {
    const wrapper = shallow(
      <ModuleWindowAdmin />
    )
    expect(wrapper).toMatchSnapshot()
  })

  test('Render modal window admin with message', () => {
    const wrapper = shallow(
      <ModuleWindowAdmin
        clockMessage='Clock successfully added.'
        cityMessage='City successfully added.'
        customerMessage='Customer successfully added.'
        orderMessage='Order successfully added.'
        masterMessage='Master successfully added.' />
    )
    expect(wrapper).toMatchSnapshot()
  })

  test('Render modal window admin with errors', () => {
    const wrapper = shallow(
      <ModuleWindowAdmin
        clockError='Failed to added clock.'/>
    )
    expect(wrapper).toMatchSnapshot()
    wrapper.setProps({ clockError: null, citiesError: 'Failed to added city.' })
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
    wrapper.setProps({ citiesError: null, usersError: 'Failed to added user.' })
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
    wrapper.setProps({ usersError: null, workersError: 'Failed to added master.' })
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
    wrapper.setProps({ workersError: null, ordersError: 'Failed to added order.' })
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })

  test('Testing map dispatch to props', () => {
    const test = mapDispatchToProps(jest.fn())
    expect(Object.keys(test)).toContain('missAdminError')
  })

  test('Testing map state to props', () => {
    const initialState = {
      clockReducer : {
        message: 'Clock successfully added.',
        error: 'Clock failed to load added.'
      },
      cityReducer: {
        message: 'City successfully added.',
        error: 'City failed to load added.'
      },
      customerReducer: {
        message: 'Customer successfully added.',
        error: 'Customer failed to load added.'
      },
      masterReducer: {
        message: 'Master successfully added.',
        error: 'Master failed to load added.'
      },
      orderReducer: {
        message: 'Order successfully added.',
        error: 'Order failed to load added.'
      }
    }
    const expected = {
      clockMessage: 'Clock successfully added.',
      cityMessage: 'City successfully added.',
      customerMessage: 'Customer successfully added.',
      orderMessage: 'Order successfully added.',
      masterMessage: 'Master successfully added.',
      clockError: 'Clock failed to load added.',
      citiesError: 'City failed to load added.',
      usersError: 'Customer failed to load added.',
      workersError: 'Master failed to load added.',
      ordersError: 'Order failed to load added.'
    }
    const test = mapStateToProps(initialState)
    expect(test).toEqual(expected)
  })

  test('Click on button close modal', () => {
    const spy = sinon.spy()
    const wrapper = shallow(
      <ModuleWindowAdmin
        missAdminError= { spy }/>
    )
    wrapper.find('.modal-info__text__bttn-close').simulate('click')
    expect(spy.calledOnce).toBe(true)
  })

  test('Click on button close modal', () => {
    jest.useFakeTimers()
    const spy = sinon.spy()
    const wrapper = shallow(
      <ModuleWindowAdmin
        missAdminError= { spy }/>
    )
    expect(spy.calledOnce).toBe(false)
    jest.runAllTimers()
    expect(spy.calledOnce).toBe(true)
  })
})
