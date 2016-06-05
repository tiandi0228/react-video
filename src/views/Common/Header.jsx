'use strict';

import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';
import $ from 'jquery';

// 头部
class Header extends React.Component {

    // 初始
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            money: '',
            username: cookie.load('username'),
        };

        // 获取用户信息
        $.ajax({
            url: 'http://www.api.com:8888/Index/User',
            type: 'POST',
            data: { username: this.state.username },
            success: function (result) {
                const user = result['data'][0];
                this.setState({
                    name: user.username,
                    money: user.money
                });
            }.bind(this)
        });
    }

    // 用户注销
    logout() {
        cookie.remove('username', { path: '/' });
        window.location.replace("/Login");
    }

    render() {
        const styles = require('./Common.css');
        return (
            <header>
                <h2 className="fl logo">自助视频推广</h2>
                <Nav />
                <ul className="fr user">
                    <li>欢迎回来，{this.state.name}</li>
                    <li><Link to="/login">个人资料</Link></li>
                    <li>金额: {this.state.money}</li>
                    <li><a onClick={this.logout}>退出</a></li>
                </ul>
            </header>
        )
    }
};

export default Header;