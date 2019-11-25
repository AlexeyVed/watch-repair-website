import { ModulePrivateRoute, mapStateToProps, mapDispatchToProps } from './PrivateRouter.jsx'
import { MemoryRouter } from 'react-router'
import Footer from '../App/Footer/Footer.jsx'

test('Make private route', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ { pathname: '/admin/orders', key: 'key' } ]}>
      <ModulePrivateRoute checkAuth={jest.fn()} inProcess={false} isAuth={true} user='admin@example.com' component={ Footer }/>
    </MemoryRouter>
  )
  expect(wrapper).toMatchSnapshot()
})

test('Make private route', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ { pathname: '/admin/orders', key: 'key' } ]}>
      <ModulePrivateRoute inProcess={true} isAuth={false} user={null} component={ Footer }/>
    </MemoryRouter>
  )
  expect(wrapper.find('.admin-main').length).toBe(0)
})

test('Testing map dispatch to props', () => {
  const test = mapDispatchToProps(jest.fn())
  expect(Object.keys(test)).toContain('checkAuth')
})

test('Testing map state to props', () => {
  const initialState = {
    loginReducer: {
      singInUser: 'admin@example.com',
      isAuth: true,
      singInLoading: false
    }
  }
  const expected = {
    user: 'admin@example.com',
    isAuth: true,
    inProcess: false
  }
  const test = mapStateToProps(initialState)
  expect(test).toEqual(expected)
})
