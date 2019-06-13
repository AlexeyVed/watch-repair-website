import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { toggleModalRegister } from "../../actions";

import './RegistrationForm.less'


class RegistrationForm extends Component {

    render() {

        const { handleSubmit, toggleModalRegister } = this.props;

        return (
            <div className='modal-window'>
                <form onSubmit={handleSubmit} className='registration-form'>
                    <div className="registration-form__header">
                        Registration
                        <button
                            className='registration-form__header__right-button-close'
                            onClick = {toggleModalRegister}>
                            &times;
                        </button>
                    </div>
                    <Field
                        name='email'
                        component='input'
                        type='text'
                        placeholder='Enter your email'
                    />
                    <Field
                        name='confEmail'
                        component='input'
                        type='text'
                        placeholder='Confirm your email'
                    />
                    <Field
                        name='password'
                        component='input'
                        type='password'
                        placeholder='Enter your password'
                    />
                    <Field
                        name='confPassword'
                        component='input'
                        type='password'
                        placeholder='Confirm your password'
                    />
                    <button type='submit' label='submit'>Submit</button>
                </form>
            </div>
        );
    }

}

RegistrationForm = connect(
    null,
    { toggleModalRegister }
    )(RegistrationForm);

export default reduxForm ({
    form: 'registration',
    onSubmit: values => console.log(values)
})(RegistrationForm);