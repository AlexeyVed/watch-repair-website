import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { toggleModalLogin, toggleModalRegister} from "../../actions";



const useStyles = makeStyles(theme => ({
    button: {
        width: '100%',
        height: '100%',
    }
}));

const Header = props => {

    const classes = useStyles();

    return (
        <div className = 'header'>

            <div className={'buttons'}>
                <Button className={classes.button} onClick = { props.toggleModalLogin }>Login In</Button>
                <Button className={classes.button} onClick = { props.toggleModalRegister }>Registration</Button>
            </div>
            <div className="middle"></div>
            <div className={'div-logo'}>
                <div className='logo'></div>
                <div className='discription'>
                    <div className='nameCompany'>ClockWise</div>
                    <div className='text'>We make your time!</div>
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