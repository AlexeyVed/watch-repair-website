import React, {Component} from 'react';
import { connect } from 'react-redux';

import { toggleModalRegister } from "../../actions";

import './RegistrationForm.less'


class RegistrationForm extends Component {
    state = {
        inputLogin: '',
        inputPassword: ''
    };

    render() {
        return (
            <div className='modal-window'>
                <div className='registration-form'>
                    <div className="registration-form__header">
                        Registration
                        <button
                            className='registration-form__header__right-button-close'
                            onClick = {this.props.toggleModalRegister}>
                            &times;
                        </button>
                    </div>
                    <input />
                    <input/>
                    <input />
                    <button>Submit</button>
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