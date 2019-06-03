import React, {Component} from 'react';

import Header from './header';
import Main from './main';
import Footer from './footer/footer.jsx';




export default class App extends Component {

    render() {
        return (
            <div className = 'app'>
                <Header/>
                <Main/>
                <Footer/>
            </div>
        )
    }
}