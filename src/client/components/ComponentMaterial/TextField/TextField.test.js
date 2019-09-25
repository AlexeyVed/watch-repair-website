import TextField from './index.jsx'

test('Text field material', () => {
    const wrapper = shallow(
        TextField({ label: 'hi', input: 'text', meta: { error: null, touched: null}, styles: {} })
    )
    expect(wrapper).toMatchSnapshot();
})

test('Text field material', () => {
    const wrapper = shallow(
        TextField({ label: 'hi', input: 'text', meta: { error: 'null', touched: true}, styles: {} })
    )
    expect(wrapper).toMatchSnapshot();
})
