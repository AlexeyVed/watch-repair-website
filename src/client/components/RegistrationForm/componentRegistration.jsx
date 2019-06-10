import React, {Component} from 'react';
import { connect } from 'react-redux';

import { toggleModalRegister } from "../../actions";

import Input from '../componentsMaterialUI/inputs.jsx'
import Button from '../componentsMaterialUI/button.jsx'


class RegistrationForm extends Component {
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
                    <button onClick = {this.props.toggleModalRegister}>Close</button>
                    <Input title = 'E-mail'/>
                    <Input title = 'password'/>
                    <Input title = 'password'/>
                    <Button onClick = {this.props.showModal}/>
                </div>
            </div>
        );
    }

}

export default connect(
    null,
    {
        toggleModalRegister
    }
)(RegistrationForm);