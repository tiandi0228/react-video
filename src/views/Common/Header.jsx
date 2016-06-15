'use strict';

import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';
import $ from 'jquery';

// 头部
class Header extends React.Component {

    
    constructor(props) {
        super(props);

        // 初始
        this.state = {
            id: '',
            username: '',
            email: cookie.load('email'),
            money: '',
            group:''
        };

        // 获取用户信息
        $.ajax({
            url: 'http://www.api.com/Index/User',
            type: 'GET',
            data: { email: this.state.email },
            success: function (result) {
                const user = result['data'];
                this.setState({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    money: user.money,
                    group: user.group
                });
            }.bind(this)
        });

        // 判断是否登录
        if (this.state.email === undefined) {
            window.location.replace("/#/Login");
            return false;
        }
    }

    // 用户注销
    logout() {
        cookie.remove('email', { path: '/' });
        window.location.replace("/#/Login");
        return false;
    }

    render() {
        const styles = require('./Common.css');
        let user;
        if(this.state.username !== '') {
            user = this.state.username;
        }else{
            user = this.state.email;
        }
        return (
            <header>
                <h2 className="fl logo">自助视频推广</h2>
                <Nav />
                <ul className="fr user">
                    <li>欢迎回来，{user} ({this.state.group})</li>
                    <li><Link to={`user/${this.state.email}`}>个人资料</Link></li>
                    <li>金额: {this.state.money}</li>
                    <li><a onClick={this.logout}>退出</a></li>
                </ul>
            </header>
        )
    }
};

export default Header;