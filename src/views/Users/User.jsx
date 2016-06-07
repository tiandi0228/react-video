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
            email: '',
            moeny: '',
            username: ''
        };

        var id = this.props.params.id;

        // 查询数据
        $.ajax({
            url: 'http://www.api.com/Index/User',
            type: 'GET',
            data: { email: id },
            success: function (result) {
                const user = result['data'][0];
                this.setState({
        	       id: user.id,
                    email: user.email,
                    money: user.money,
                    username: user.username,
                    password: user.password

                });
            }.bind(this)
        });
    }

    // 验证昵称
    handleChange(e) {
        e.preventDefault();
        $.ajax({
            url:'http://www.api.com/Index/User/Edit',
            type: 'GET',
            data: { username: this.refs.username.value},
            success: function (result) {
                const res = JSON.parse(result);
                if(res['code'] === 200){
                    $('.username .tips').html("<span class='success'>"+res['message']+"</span>");
                    $('.username .tips .success').css({'display':'block'});
                    $('.username .tips .error').css({'display':'none'});
                }else{
                    $('.username .tips').html("<span class='error'>"+res['message']+"</span>");
                    $('.username .tips .error').css({'display':'block'});
                    $('.username .tips .success').css({'display':'none'});
                }
            }.bind(this)
        });
    }

    // 提交修改信息
    handleSubmit(e){
        e.preventDefault();
        let username = this.refs.username;
        let password = this.refs.password;
        let confirmPassword = this.refs.confirmPassword;
        if(username !== undefined){
            username = username.value;
            password = password.value;
            confirmPassword = confirmPassword.value;
         }else{
            username = this.state.username;
            password = password.value;
            confirmPassword = confirmPassword.value;
         }

        if (password.length === 0){
            return true;
        }

        // 判断密码长度
        if (password.length < 6){
            $('.password .tips').html("<div class='error'>密码长度不能小于6位!</div>");
            $('.password .tips .error').fadeIn("slow");
            return false;
        }else if(password.length > 16){
            $('.password .tips').html("<div class='error'>密码长度不能大于16位!</div>");
            $('.password .tips .error').fadeIn("slow");
            return false;
        }else{
            $('.password .tips .error').fadeOut("slow");
        };

        if (password !== confirmPassword){
            $('.confirmPassword .tips').html("<div class='error'>两次填写的密码不一致!</div>");
            $('.confirmPassword .tips .error').fadeIn("slow");
            return false;
        }else{
            $('.confirmPassword .tips .error').fadeOut("slow");
        };
        console.log(1111);
        $.ajax({
            url:'http://www.api.com/Index/User/Edit',
            type: 'POST',
            data: { id: this.state.id, username: username, password: password },
            success: function (result) {
                alert('修改成功!');
                location.reload();
            }.bind(this)
        });
        
    }

    render() {
        const styles = require('./User.css');
        let nickname;
        let prompt;
        if(this.state.username === ''){
            nickname = <input type="text" ref="username" onChange={this.handleChange.bind(this)} />;
            prompt = <span className="prompt">只能修改一次！</span>;
        }else{
            nickname = <span className="username">{this.state.username}</span>;
            prompt = <span></span>;
        }
        return (
            <div>
                <Header />
                <div className="user-edit">
                    <form name="form" id="form" onSubmit={this.handleSubmit.bind(this) }>
                    	<div className="ipt username">
            	       <label>昵称：</label>
                               {nickname}
                               <div className="tips"></div>
                    	</div>
                        <div className="ipt">
                                <label>邮箱：</label>
                                <span className="email">{this.state.email}</span>
                        </div>
                        <div className="ipt password">
                                <label>密码：</label>
                                <input type="password" ref="password" />
                                <div className="tips"></div>
                        </div>
                        <div className="ipt confirmPassword">
                                <label>确认密码：</label>
                                <input type="password" ref="confirmPassword" />
                                <div className="tips"></div>
                        </div>
                        <div className="ipt">
                                <label>金额：</label>
                                <span className="prices">{this.state.money}</span>
                        </div>
                        <div className="ipt">
                                <button type="submit" className="btn">修 改</button>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        )
    }
}

export default User;