'use strict';

import React from 'react';
import cookie from 'react-cookie';
import {Link} from 'react-router';
import $ from 'jquery';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';

// 用户列表
class Users extends React.Component {

    constructor(props) {
        super(props);

        // 初始
        this.state = {
            data: [],
            email: cookie.load('email'),
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
                    group: user.group
                });
            }.bind(this)
        });

        // 获取列表
        $.ajax({
            url: 'http://www.api.com/Index/User/UserList',
            type: 'GET',
            success: function (result) {
                this.setState({ data: result['data'] });
            }.bind(this)
        });
    }

    // 添加
    create() {
        $(".create").animate({top: '150px',opacity: '1'},"slow");
        $(".make").css("display","block");
    }

    render() {
        const styles = require('./User.css');
        // 判断权限
        if (this.state.group !== '管理员') {
            window.location.replace("/");
        }
        const usersItems = this.state.data.map(function (item) {
            return (
                <ul key={item.id} id={item.id}>
                    <li>{item.id}</li>
                    <li>{item.username}</li>
                    <li>{item.email}</li>
                    <li>{item.logtime}</li>
                    <li>{item.logip}</li>
                    <li>{item.group}</li>
                    <li><Link to={`user/${item.email}`}>编辑</Link></li>
                </ul>
            );
        }.bind(this));
        return (
            <div>
                <Header />
                <div className="users">
                    <div className="tit">
                        <h2 className="fl">用户列表</h2>
                        <span className="fr" onClick={this.create}>添加</span>
                    </div>
                    <div className="list">
                        <ol>
                            <li>编号</li>
                            <li>昵称</li>
                            <li>邮箱</li>
                            <li>登录时间</li>
                            <li>登录ip</li>
                            <li>用户组</li>
                            <li>操作</li>
                        </ol>
                        {usersItems}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Users;