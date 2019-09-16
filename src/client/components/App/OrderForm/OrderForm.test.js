import React from 'react'
import { ModuleOrderForm } from './OrderForm.jsx'
import { getDate } from './logic.js'

test('Render order form', () => {
    const wrapper = shallow(
        <ModuleOrderForm
        makeOrder = { jest.fn() }
        handleSubmit = { jest.fn() }
        dispatch = { jest.fn() }
        chooseClock = { [] }
        chooseCities = { [] }
        chooseMaster = { [] }/>
    )
    expect(wrapper).toMatchSnapshot();
})

test('get date today', () => {
    const date = new Date('2019-12-30T00:00:00')
    expect(getDate(date)).toEqual({
        date: '2019-12-30',
        time: 9
      })
})

test('get date tomorrow', () => {
    const date = new Date('2019-12-08T20:00:00')
    expect(getDate(date)).toEqual({
        date: '2019-12-09',
        time: 9
      })
})
