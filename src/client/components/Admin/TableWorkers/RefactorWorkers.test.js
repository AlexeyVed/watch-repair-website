import React from 'react'
import { ModuleRefactorWorkers } from './RefactorWorkers.jsx'

test('Render table masters', () => {
    const master = [
        {
            id: 1,
            name: "Sergey",
            rating: 5,
            cityId: 1,
            city: {
                id: 1,
                city: "Dnipro"
            }
        },
        {
            id: 2,
            name: "Nickolay",
            rating: 4,
            cityId: 2,
            city: {
                id: 2,
                city: "Uzhgorod"
            }
        }
    ]
    const wrapper = shallow(
        <ModuleRefactorWorkers
        deleteWorker = { jest.fn() }
        loadWorkers = { () => {
            return new Promise( (res, rej) => {
                true ? res('true') : rej('false')
            })
        } }
        loadCities = { () => {
            return new Promise( (res, rej) => {
                true ? res('true') : rej('false')
            })
        } }
        loadEnd = { jest.fn() }
        setPage = { jest.fn() }
        workers = { master }/>
    )
    expect(wrapper).toMatchSnapshot();
})