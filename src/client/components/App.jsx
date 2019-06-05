import React, {Component} from 'react';

import Header from './header';
import Main from './main';
import Portal from './authentication'


export default class App extends Component {
    state = {
        showModal: false,
    }

    changeModal = () => {
        this.setState(() => ({showModal: !this.state.showModal}))
        return this.state.showModal
    }

    render() {
        return (
            <div className = 'app'>
                <Header showModal={this.changeModal}/>
                <Main/>
                {(this.state.showModal) ? <Portal showModal={this.changeModal}/> : null }
            </div>
        )
    }
}