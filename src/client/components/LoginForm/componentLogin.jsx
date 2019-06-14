import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import myInput from '../FieldRedux'

import { toggleModalLogin, toggleAdminMode } from "../../actions";
import { validateEmail, validatePassword } from '../../validation'
import { login } from './logicForLogin.js'

import './LoginForm.less'


class LoginForm extends React.Component {

    render () {

        const { handleSubmit, toggleModalLogin } = this.props;

        return (
            <div className='modal-window'>
                <form onSubmit={handleSubmit} className='login-form'>
                    <div className="login-form__header">
                        Member login
                        <button
                            className='login-form__header__right-button-close'
                            onClick={toggleModalLogin}>
                            &times;
                        </button>
                    </div>
                    <Field
                        label='Your email'
                        name='email'
                        component={myInput}
                        type='text'
                        placeholder='Enter your email'
                        validate={validateEmail}
                    />
                    <Field
                        label='Your password'
                        name='password'
                        component={myInput}
                        type='password'
                        placeholder='Enter your password'
                        validate={validatePassword}
                    />
                    <button type='submit' label='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

LoginForm = connect(
    null,
    { toggleModalLogin, toggleAdminMode }
    )(LoginForm);

export default reduxForm ({
    form: 'login',
    onSubmit: values => { login(values.email, values.password) }
})(LoginForm);