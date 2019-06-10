import React, {Component} from 'react';
import {verify} from './logicForLogin';
import { connect } from 'react-redux';

import { toggleModalLogin } from "../../actions";

import './LoginForm.less'


class LoginForm extends Component {

    state = {
        email: '',
        password: ''
    };

    check = () => {}

    login = event => {

        const login = this.state.email;
        const pass = this.state.password;
        console.log(this.state)
        verify(login, pass)
            .then(() => {
                this.props.login(login);
            })
            .catch(error => {
                console.log(error)
            });
        event.preventDefault();
    };

    render() {
        return (
            <div className="modal-window">
                <div className='login-form'>
                    <div className="login-form__header">
                        Member login
                        <button
                            className='login-form__header__right-button-close'
                            onClick = {this.props.toggleModalLogin}>
                            &times;
                        </button>
                    </div>

                    <input
                    />
                    <input
                    />
                    <button onClick = {this.login}>Submit</button>
                </div>
            </div>
        );
    }

}

export default connect(
    null,
    {
        toggleModalLogin
    }
)(LoginForm)