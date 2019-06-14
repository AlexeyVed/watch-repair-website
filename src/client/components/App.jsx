import React, {Component} from 'react';
import { connect } from 'react-redux';

import Header from './Header/Header.jsx';
import Main from './Main';
import MainAdmin from './MainAdmin/MainAdmin.jsx';
import Portal from './PortalAuthentication/PortalAuthentication.jsx'


class App extends Component {

    render() {

        const { isAdmin } = this.props;

        return (
            <div className = 'app'>
                <Header/>
                {(isAdmin) ? <Main/> : <MainAdmin/>}
                <Portal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.adminReducer.isAdmin,
    };
};

export default connect(mapStateToProps)(App)