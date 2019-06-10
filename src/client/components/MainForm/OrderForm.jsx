import React, {Component} from 'react';

import './OrderForm.less'


export default class OrderForm extends Component {

    render() {
        return (
            <div className='main-form'>
                <div className='main-form__title'>Make you order</div>
                <div className='main-form__order-form'>
                    <input className=''/>
                    <input title='E-mail'/>
                    <select title='clock'/>
                    <select title='city'/>
                    <button>submit</button>
                </div>
            </div>
        );
    }
}