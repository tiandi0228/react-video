'use strict';

import React from 'react';
import cookie from 'react-cookie';
import $ from 'jquery';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';

// 用户信息
class User extends React.Component {

     constructor(props) {
        super(props);

        // 初始
        this.state = {
        	id:' ',
            email: cookie.load('email'),
            moeny: '',
            username: ''
        };

        $.ajax({
            url: 'http://www.api.com/Index/User',
            type: 'GET',
            data: { email: this.state.email },
            success: function (result) {
                const user = result['data'][0];
                this.setState({
            	       id: user.id,
                    email: user.email,
                    money: user.money,
                    username: user.username
                });
            }.bind(this)
        });
    }

    render() {
        const styles = require('./User.css');
        return (
            <div>
                <Header />
                <div className="edit">
                	<div>
                		<label>昵称：</label>
                		<input type="text" ref="username" />
                	</div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default User;