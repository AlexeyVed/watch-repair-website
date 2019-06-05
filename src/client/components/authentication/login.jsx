import React, {Component} from 'react';
import {verify} from './logicForLogin';

import Input from './material-component/inputs.jsx'
import Button from './material-component/button.jsx'


class LoginForm extends Component {
    state = {
        inputLogin: '',
        inputPassword: ''
    };

    login = event => {
        const login = this.state.inputLogin;
        const pass = this.state.inputPassword;
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
                    <Input title = 'E-mail'/>
                    <Input title = 'password'/>
                    <Button onClick = {this.props.showModal}/>
                </div>
            </div>
        );
    }

}

export default LoginForm;