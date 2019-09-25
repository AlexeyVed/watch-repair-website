import PrivateRoute from './PrivateRouter.jsx'

test('Make private route', () => {
    const wrapper = shallow(
        PrivateRoute({ component: null, auth: 'admin@example.com' })
    )
    expect(wrapper).toMatchSnapshot();
})

test('Make private route', () => {
    const wrapper = shallow(
        PrivateRoute({ component: null, auth: 'noAdmin@example.com' })
    )
    expect(wrapper).toMatchSnapshot();
})