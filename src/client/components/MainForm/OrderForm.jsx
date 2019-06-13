import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


import './OrderForm.less'



class OrderForm extends Component {

    render() {
        const { handleSubmit, chooseClock, chooseCities } = this.props;

        return (
            <div className='main-form'>
                <div className='main-form__title'>Make you order</div>
                <form
                    onSubmit={handleSubmit}
                    className='main-form__order-form'>
                    <Field
                        name='name'
                        component='input'
                        type='text'
                        placeholder='Enter your name'
                    />
                    <Field
                        name='email'
                        component='input'
                        type='text'
                        placeholder='Enter your email'
                    />
                    <Field
                        name='clock'
                        component='select'
                        type='text'
                    >
                        <option key={0} value={false}>Choose your clock</option>
                        {
                            chooseClock.map((clock, index) => (
                                <option key={index} value={clock.timeRepair}>{clock.name}</option>
                            ))
                        }
                    </Field>
                    <Field
                        name='city'
                        component='select'
                        type='text'
                    >
                        <option key={0} value={false}>Choose your city</option>
                        {
                            chooseCities.map((city, index) => (
                                <option key={index}>{city}</option>
                            ))
                        }
                    </Field>

                    <button type='submit' label='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chooseClock: state.clientReducer.orderFormData.clock,
        chooseCities: state.clientReducer.orderFormData.cities
    };
};

OrderForm = connect(
    mapStateToProps,
    null
)(OrderForm);

export default reduxForm ({
    form: 'order',
    onSubmit: values => console.log(values)
})(OrderForm);