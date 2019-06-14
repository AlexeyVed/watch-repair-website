import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { toggleModalRegister } from "../../actions";
import myInput from '../FieldRedux'
import { validateEmail, confirmEmail, confirmPassword, validatePassword } from '../../validation'
import { register } from './logicForRegistration.js'

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
                        label='Your email'
                        name='email'
                        component={myInput}
                        type='text'
                        placeholder='Enter your email'
                        validate={[validateEmail]}
                        required
                    />
                    <Field
                        label='Confirm your email'
                        name='confirm-email'
                        component={myInput}
                        type='text'
                        placeholder='Confirm your email'
                        validate={[validateEmail, confirmEmail]}
                        required
                    />
                    <Field
                        label='Create a password'
                        name='password'
                        component={myInput}
                        type='password'
                        placeholder='Enter your password'
                        validate={validatePassword}
                        required
                    />
                    <Field
                        label='Confirm your password'
                        name='confirm-password'
                        component={myInput}
                        type='password'
                        placeholder='Confirm your password'
                        validate={[confirmPassword]}
                        required
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