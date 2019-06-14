import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';

import LoginForm from '../LoginForm/componentLogin.jsx'
import RegisterForm from '../RegistrationForm/componentRegistration.jsx'
import './PortalAuthentication.less'




class Portal extends React.Component {

    render() {

        let view = null;

        if (this.props.isActiveRegister) {
            view = <RegisterForm/>
        } else if (this.props.isActiveLogin) {
            view = <LoginForm/>
        }

        return (
            ReactDOM.createPortal(view, document.getElementById('modal-root'))
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isActiveLogin: state.appReducer.showModal.isActiveLogin,
        isActiveRegister: state.appReducer.showModal.isActiveRegister
    };
};

export default connect(mapStateToProps)(Portal)