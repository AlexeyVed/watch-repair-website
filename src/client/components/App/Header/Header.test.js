import React from 'react'
import { ModuleHeader, mapDispatchToProps, mapStateToProps } from './Header.jsx'
// import configureMockStore from 'redux-mock-store'

const initialState = {
    loginReducer: {
        singInUser: 'admin@example.com'
    }
}

describe ('Tests for header', () => {
    test('Render header', () => {
        const wrapper = shallow(
            <ModuleHeader/>
        )
        expect(wrapper).toMatchSnapshot();
    })

    test('Render header & click to admin', () => {
        const wrapper = shallow(
            <ModuleHeader 
            currentUser = 'admin@example.com'/>
        )
        wrapper.find('.container-user__user').simulate("click")
        expect(wrapper).toMatchSnapshot()
    })

    test('Render header & click to home', () => {
        const wrapper = shallow(
            <ModuleHeader 
            currentUser = 'admin@example.com'/>
        )
        wrapper.find('.container-logo').simulate("click")
        expect(wrapper).toMatchSnapshot()
    })

    test('Render header & click to logout', () => {
        const wrapper = shallow(
            <ModuleHeader 
            currentUser = 'admin@example.com'
            logOut = { jest.fn() }/>
        )
        wrapper.find('.container-buttons__button-logout').simulate("click")
        expect(wrapper).toMatchSnapshot()
    })

    test('Testing map dispatch to props', () => {
        const test = mapDispatchToProps(jest.fn())
        expect(Object.keys(test)).toContain('logOut')
    })

    test('Testing map state to props', () => {
        const test = mapStateToProps(initialState)
        const expected = {
            currentUser: 'admin@example.com'
        }
        expect(test).toEqual(expected)
    })

    // describe('Testing redux connection', () => {
    //     const mockStore = configureMockStore()
    //     const logOutSpy = sinon.spy()

    //     const initialState = {
    //         loginReducer: {
    //             singInUser: 'admin@example.com'
    //         }
    //     }
    //     const store = mockStore(initialState);
        
    //     test('Test redux connections mapStateToProps', () => {
    //         const wrapper = mount(
    //             <Header store={ store } />
    //         )
    //         wrapper.find('.container-buttons__button-logout').simulate("click")
          
    //         expect(store.getActions()).toBe(true)
    //     })  
    // })
})
