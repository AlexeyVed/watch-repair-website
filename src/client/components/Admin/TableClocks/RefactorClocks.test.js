import React from 'react'
import { ModuleRefactorClocks } from './RefactorClocks.jsx'

test('Render table clocks', () => {
    const clocks = [
        {
            id: 1,
            typeClock: "Small",
            timeRepair: 1
        },
        {
            id: 2,
            typeClock: "Medium",
            timeRepair: 2
        },
        {
            id: 3,
            typeClock: "Big",
            timeRepair: 3
        }
    ]
    const wrapper = shallow(
        <ModuleRefactorClocks
        deleteClock = { jest.fn() }
        loadClocks = { () => {
            return new Promise( (res, rej) => {
                true ? res('true') : rej('false')
            })
        } }
        loadEnd = { jest.fn() }
        setPage = { jest.fn() }
        clocks = { clocks }/>
    )
    expect(wrapper).toMatchSnapshot();
})