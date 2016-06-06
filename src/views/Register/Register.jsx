'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

class Register extends React.Component {

    // 验证邮箱
    handleChange(e) {
        e.preventDefault();
        $.ajax({
            url:'http://www.api.com/Index/Signup',
            type: 'GET',
            data: { email: this.refs.email.value},
            success: function (result) {
                const res = JSON.parse(result);
                if(res['code'] === 200){
                    $('.email .tips').html("<span class='success'>"+res['message']+"</span>");
                    $('.email .tips .success').css({'display':'block'});
                    $('.email .tips .error').css({'display':'none'});
                }else{
                    $('.email .tips').html("<span class='error'>"+res['message']+"</span>");
                    $('.email .tips .error').css({'display':'block'});
                    $('.email .tips .success').css({'display':'none'});
                }
            }.bind(this)
        });

    }

    // 提交注册
    signUp(e) {
        e.preventDefault();
        const post = {
          email: this.refs.email.value,
          password: this.refs.password.value,
          confirmPassword: this.refs.confirmPassword.value
        };

        // 判断邮箱是否为空
        if (post['email'] === ''){
            $('.email .tips').html("<div class='error'>请输入邮箱地址!</div>");
            $('.email .tips .error').fadeIn("slow");
            return false;
        };

        // 判断密码是否为空
        if (post['password'] === ''){
            $('.password .tips').html("<div class='error'>请输入密码!</div>");
            $('.password .tips .error').fadeIn("slow");
            return false;
        }else{
            $('.password .tips .error').fadeOut("slow");
        };

        if (post['password'] !== post['confirmPassword']){
            $('.confirmPassword .tips').html("<div class='error'>两次填写的密码不一致!</div>");
            $('.confirmPassword .tips .error').fadeIn("slow");
            return false;
        }else{
            $('.confirmPassword .tips .error').fadeOut("slow");
        };

        $.ajax({
            url:'http://www.api.com/Index/Signup',
            type: 'POST',
            data: { email: post['email'], password: post['password']},
            success: function (result) {
                console.log('注册成功!');
                window.location.replace("/Login");
            }.bind(this)
        });
    }

    render () {
        const styles = require('./Register.css');
        return (
            <div className="register">
                <h2 className="name">注册</h2>
                <div className="list-box email">
                    <label className="label">邮　箱：</label>
                    <input type="text" ref="email" placeholder="请输入邮箱" className="txt" onChange={this.handleChange.bind(this)} />
                    <div className="tips"></div>
                </div>
                <div className="list-box password">
                    <label className="label">密　码：</label>
                    <input type="password" ref="password" placeholder="请输入密码" className="txt" />
                    <div className="tips"></div>
                </div>
                <div className="list-box confirmPassword">
                    <label className="label">确认密码：</label>
                    <input type="password" ref="confirmPassword" placeholder="请输入确认密码" className="txt" />
                    <div className="tips"></div>
                </div>
                <div className="list-box">
                    <button type="submit" className="btn" ref='submit' onClick={this.signUp.bind(this)}>注 册</button>
                </div>
                <div className="foot">
                    <Link to="/login">已有账号，直接登录</Link>
                </div>
            </div>
        );
    }
}

export default Register;