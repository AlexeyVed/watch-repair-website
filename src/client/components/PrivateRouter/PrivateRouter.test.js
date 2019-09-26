import PrivateRoute from './PrivateRouter.jsx'
import { MemoryRouter } from 'react-router'
import Footer from '../App/Footer/Footer.jsx'

let wrapper

afterEach(() => {
  wrapper.unmount()
})

test('Make private route', () => {
  wrapper = mount(
    <MemoryRouter initialEntries={[ { pathname: '/admin/orders', key: 'key' } ]}>
      <PrivateRoute auth='admin@example.com' component={ Footer }/>
    </MemoryRouter>
  )
  expect(wrapper).toMatchSnapshot()
})

test('Make private route', () => {
  wrapper = mount(
    <MemoryRouter initialEntries={[ { pathname: '/admin/orders', key: 'key' } ]}>
      <PrivateRoute auth={ null } component={ Footer }/>
    </MemoryRouter>
  )
  expect(wrapper.find('.admin-main').length).toBe(0)
})
