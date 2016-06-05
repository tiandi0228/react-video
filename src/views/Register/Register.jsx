'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

class Register extends React.Component {

    handleChange(e) {
        e.preventDefault();
        $.ajax({
            url:'http://www.api.com:8888/Index/Signup',
            type: 'POST',
            data: { username: this.refs.username.value},
            success: function (result) {
                if(result['code'] === 200){
                    $('.username .success').html(result['message']);
                    $('.username .success').fadeIn("slow");
                    $('.username .error').fadeOut("slow");
                }else{
                    $('.username .error').html(result['message']);
                    $('.username .error').fadeIn("slow");
                    $('.username .success').fadeOut("slow");
                    return false;
                }
            }.bind(this)
        });
    }

    signup(e) {
        e.preventDefault();
        const post = {
          username: this.refs.username.value,
          email: this.refs.email.value,
          password: this.refs.password.value,
          confirmPassword: this.refs.confirmPassword.value
        }

        $.ajax({
            url:'http://www.api.com:8888/Index/Signup',
            type: 'POST',
            data: { username: post['username'], emai: post['email'], password: post['password']},
            success: function (result) {
                console.log('注册成功!');
            }.bind(this)
        });
    }

    render () {
        const styles = require('./Register.css');
        return (
            <div className="register">
                <h2 className="name">注册</h2>
                <div className="list-box username">
                    <label className="label">登录名：</label>
                    <input type="text" ref="username" placeholder="请输入账号" className="txt" onChange={this.handleChange.bind(this)} />
                    <div className="error"></div>
                    <div className="success"></div>
                </div>
                <div className="list-box">
                    <label className="label">邮　箱：</label>
                    <input type="text" ref="email" placeholder="请输入邮箱" className="txt" />
                    <div className="error"></div>
                </div>                
                <div className="list-box">
                    <label className="label">密　码：</label>
                    <input type="password" ref="password" placeholder="请输入密码" className="txt" />
                    <div className="error"></div>
                </div>
                <div className="list-box">
                    <label className="label">确认密码：</label>
                    <input type="password" ref="confirmPassword" placeholder="请输入确认密码" className="txt" />
                    <div className="error"></div>
                </div>
                <div className="list-box">
                    <button type="submit" className="btn" ref='submit' onClick={this.signup.bind(this)}>注 册</button>
                </div>
                <div className="foot">
                    <Link to="/login">已有账号，直接登录</Link>
                </div>
            </div>
        );
    }
}

export default Register;