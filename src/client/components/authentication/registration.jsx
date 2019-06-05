import React, {Component} from 'react';

import Input from './material-component/inputs.jsx'
import Button from './material-component/button.jsx'


class LoginForm extends Component {
    state = {
        inputLogin: '',
        inputPassword: ''
    };

    render() {
        return (
            <div className="modal-window">
                <div className='loginForm'>
                    <div className="header-form">
                        Registration
                    </div>
                    <Input title = 'E-mail'/>
                    <Input title = 'password'/>
                    <Input title = 'password'/>
                    <Button onClick = {this.props.showModal}/>
                </div>
            </div>
        );
    }

}

export default LoginForm;