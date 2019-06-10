import React, {Component} from 'react';
import {verify} from './logicForLogin';
import { connect } from 'react-redux';

import { toggleModalLogin } from "../../actions";

import Input from '../componentsMaterialUI/inputs.jsx'
import Button from '../componentsMaterialUI/button.jsx'


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
                <div className='loginForm'>
                    <div className="header-form">
                        Member login
                    </div>
                    <button onClick = {this.props.toggleModalLogin}>Close</button>
                    <Input
                        name = 'email'
                        title = 'E-mail'
                        onChange = { this.onChange }
                    />
                    <Input
                        name = 'password'
                        title = 'password'
                        onChange = { this.onChange }
                    />
                    <Button onClick = {this.login}/>
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