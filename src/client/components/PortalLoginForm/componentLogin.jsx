import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { toggleModalLogin } from "../../actions";

import './LoginForm.less'


class LoginForm extends Component {

    state = {
        email: '',
        password: ''
    };

    login = event => {
        const login = this.state.email;
        const pass = this.state.password;
        console.log(login, pass)
        axios.post(`http://localhost:4000/login`, { login, pass })
            .then(res => {
                console.log(res);
            })
    };

    onChange = (e) => {
        switch (e.target.name) {
            case 'email':
                this.setState({[e.target.name]: e.target.value})
                break;
            case 'password':
                this.setState({[e.target.name]: e.target.value})
                break;
        }
    }

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
                        name='email'
                        type='text'
                        value={this.state.email}
                        onChange={this.onChange}
                        placeholder='Enter your email'
                    />
                    <input
                        name='password'
                        type='password'
                        value={this.state.password}
                        onChange={this.onChange}
                        placeholder='Enter your password'
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