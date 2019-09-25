import SelectField from './index.jsx'

test('Select field material ', () => {
    const wrapper = shallow(
        SelectField({ input: {name: 'text', id: 'text'} , label: 'hi', meta: { error: null, touched: null}, children: null, id: null, styles: {} })
    )
    expect(wrapper).toMatchSnapshot();
})

test('Select field material', () => {
    const wrapper = shallow(
        SelectField({ input: {name: 'text', id: 'text'} , label: 'hi', meta: { error: 'null', touched: true}, children: null, id: null, styles: {} })
    )
    expect(wrapper).toMatchSnapshot();
})
