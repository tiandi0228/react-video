'use strict';

import React from 'react';
import $ from 'jquery';
import cookie from 'react-cookie';

// 充值
class Pay extends React.Component {

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
            data: { email: cookie.load('mail') },
            success: function (result) {
                const user = result['data'];
                this.setState({
                    username: user.username,
                    email: user.email,
                    money: user.money
                });
            }.bind(this)
        });
    }

    // 关闭窗口
    close() {
        $(".pay").animate({width: '0',height: '0',opacity: '0'},"slow");
        location.reload();
    }

    // 提交充值
    handleSubmit(e) {
            e.preventDefault();
            const money = this.refs.money.value;
            
            $.ajax({
                url: 'http://www.api.com/Index/Pay',
                type: 'POST',
                data: { num: post['num'], email: this.state.email, money: n },
                success: function () {
                   location.reload();
                }
            });

    }

    render() {
        const styles = require('./User.css');
        let user;
        let mail;
        if(this.state.username !== '') {
            mail = <label className="label-name">昵称：</label>;
            user = <span>{this.state.username}</span>;
        }else{
            mail = <label className="label-name">邮箱：</label>;
            user = <span>{this.state.email}</span>;
        }
        return (
            <div>
                <div className="pay">
                    <div className="close" onClick={this.close}>X</div>
                    <div>
                        <form name="form" id="form" onSubmit={this.handleSubmit.bind(this) }>
                            <div className="ipt">
                                {mail}
                                {user}
                            </div>
                            <div className="ipt">
                                <label className="label-name">金额：</label>
                                <input type="money" className="money" ref="num" />
                            </div>
                            <div className="ipt">
                                <button type="submit" className="btn">充 值</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

export default Pay;