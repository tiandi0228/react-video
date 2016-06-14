'use strict';

import React from 'react';
import cookie from 'react-cookie';
import {Link} from 'react-router';
import $ from 'jquery';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';

// 消费记录
class Pay extends React.Component {

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
        const styles = require('./Pay.css');
        const usersItems = this.state.data.map(function (item) {
            return (
                <ul key={item.id} id={item.id}>
                    <li>{item.logtime}</li>
                    <li>{item.email}</li>
                    <li>{item.logtime}</li>
                    <li>{item.logtime}</li>
                </ul>
            );
        }.bind(this));
        return (
            <div>
                <Header />
                <div className="pay">
                    <div className="tit">
                        <h2 className="fl">消费记录</h2>
                    </div>
                    <div className="list">
                        <ol>
                            <li>消费日期</li>
                            <li>标题</li>
                            <li>金额</li>
                            <li>状态</li>
                        </ol>
                        {usersItems}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Pay;