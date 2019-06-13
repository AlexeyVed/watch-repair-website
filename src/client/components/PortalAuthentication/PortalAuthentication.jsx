import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';

import LoginForm from '../PortalLoginForm/componentLogin.jsx'
import RegisterForm from '../PortalRegistrationForm/componentRegistration.jsx'
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
        isActiveLogin: state.clientReducer.showModal.isActiveLogin,
        isActiveRegister: state.clientReducer.showModal.isActiveRegister
    };
};

export default connect(mapStateToProps)(Portal)