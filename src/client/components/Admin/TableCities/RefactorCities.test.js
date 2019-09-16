import React from 'react'
import { ModuleRefactorCities } from './RefactorCities.jsx'

test('Render table cities', () => {

    const cities = [
        {
            id: 1,
            city: "Dnipro"
        },
        {
            id: 4,
            city: "kjgh"
        },
        {
            id: 2,
            city: "Uzhgorod"
        }
    ]
    const wrapper = shallow(
        <ModuleRefactorCities
        deleteCity = { jest.fn() }
        loadCities = { () => {
            return new Promise( (res, rej) => {
                true ? res('true') : rej('false')
            })
        } }
        loadEnd = { jest.fn() }
        setPage = { jest.fn() }
        cities = { cities }/>
    )
    expect(wrapper).toMatchSnapshot();
})