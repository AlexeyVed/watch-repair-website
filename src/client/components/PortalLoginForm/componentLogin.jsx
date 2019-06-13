import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


import { toggleModalLogin } from "../../actions";
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
                        name='email'
                        component='input'
                        type='text'
                        placeholder='Enter your email'
                    />
                    <Field
                        name='password'
                        component='input'
                        type='password'
                        placeholder='Enter your password'
                    />
                    <button type='submit' label='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

LoginForm = connect(
    null,
    { toggleModalLogin }
    )(LoginForm);

export default reduxForm ({
    form: 'login',
    onSubmit: values => login(values.email, values.password)
})(LoginForm);