import React from 'react';
import { connect } from 'react-redux';

import { toggleModalLogin, toggleModalRegister} from "../../actions";
import './header.less'


const Header = props => {



    return (
        <div className = 'header'>

            <div className='container-buttons'>
                <button className='container-buttons__button-login header-buttons' onClick = { props.toggleModalLogin }>Login In</button>
                <button className='container-buttons__button-register header-buttons' onClick = { props.toggleModalRegister }>Registration</button>
            </div>
            <div className='container-middle'></div>
            <div className='container-logo'>
                <div className='container-logo__logo'></div>
                <div className='container-logo__description'>
                    <div className='container-logo__description company-name'>ClockWise</div>
                    <div className='container-logo__description tagline'>We make your time!</div>
                </div>
            </div>

        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        isActiveLogin: state.isActiveLogin,
        isActiveRegister: state.isActiveRegister
    };
};

export default connect(
    mapStateToProps,
    {
        toggleModalRegister,
        toggleModalLogin
    }
)(Header)