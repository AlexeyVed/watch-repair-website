import React from 'react'
import { ModuleWindowApp, mapDispatchToProps, mapStateToProps } from '../ModalWindowApp.jsx'

describe('Testing modal app', () => {
  test('Render modal window', () => {
    const wrapper = shallow(
      <ModuleWindowApp />
    )
    expect(wrapper).toMatchSnapshot()
  })

  test('Render modal window admin with message', () => {
    const wrapper = shallow(
      <ModuleWindowApp
        makeOrderError='All masters in this city already bussy at this time. Please, choose other day'/>
    )
    expect(wrapper).toMatchSnapshot()
  })

  test('Testing map dispatch to props', () => {
    const test = mapDispatchToProps(jest.fn())
    expect(Object.keys(test)).toContain('missAppError')
  })

  test('Testing map state to props', () => {
    const initialState = {
      appReducer: {
        error: 'All masters in this city already bussy at this time. Please, choose other day'
      }
    }
    const expected = {
      makeOrderError: 'All masters in this city already bussy at this time. Please, choose other day'
    }
    const test = mapStateToProps(initialState)
    expect(test).toEqual(expected)
  })

  test('Click on button close modal', () => {
    const spy = sinon.spy()
    const wrapper = shallow(
      <ModuleWindowApp
        missAppError= { spy }/>
    )
    wrapper.find('.modal-info__text__bttn-close').simulate('click')
    expect(spy.calledOnce).toBe(true)
  })

  test('Click on button close modal', () => {
    jest.useFakeTimers()
    const spy = sinon.spy()
    const wrapper = shallow(
      <ModuleWindowApp
        missAppError= { spy }/>
    )
    expect(spy.calledOnce).toBe(false)
    jest.runAllTimers()
    expect(spy.calledOnce).toBe(true)
  })
})
