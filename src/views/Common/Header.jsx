'use strict';

import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';

// 头部
class Header extends React.Component {

    // 初始
    constructor() {
        super();
        this.state = {
            username: cookie.load('username'),
        };
    }

    // 用户注销
    logout() {
        cookie.remove('username', { path: '/' });
    }

    render() {
        const styles = require('./Common.css');
        return (
            <header>
                <h2 className="fl logo">自助视频推广</h2>
                <Nav />
                <ul className="fr user">
                    <li>欢迎回来，{this.state.username}</li>
                    <li><Link to="/login">个人资料</Link></li>
                    <li><Link to="/login">登录</Link></li>
                    <li>金额:10.00</li>
                    <li><a onClick={this.logout}>退出</a></li>
                </ul>
            </header>
        )
    }
};

export default Header;