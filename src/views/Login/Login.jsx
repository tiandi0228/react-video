'use strict';

import React from 'react';
import cookie from 'react-cookie';
import {Link} from 'react-router';
import $ from 'jquery';

class Login extends React.Component {

  constructor(props) {
    super(props);

    // 背景图替换
    this.timer = setInterval(function() {
      for (var i = 0; i < 4; i++) {
        const bg = document.getElementById('loginBg');
        bg.className = 'loginBg bg bg' + Math.ceil(Math.random() * i);
      }
    }.bind(this), 5000);
  }

  // 验证登录
  login(e) {
    e.preventDefault();
    const post = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }

    if (post['username'] === '' || post['password'] === ' ') {
      $('.login-box .error').html('<span>请输入账号或密码！</span>');
      $('.login-box .error').fadeIn("slow");
    } else {
      $('.login-box .error').fadeOut("slow");
      // 获取用户信息
      $.ajax({
        url: 'http://www.api.com:8888/Index/login',
        type: 'POST',
        data: {username: post['username'],password: post['password']},
        success: function(result) {
          const user = result['data'];
          if (user === false) {
            $('.login-box .error').html('<span>账号或密码错误，请重新输入！</span>');
            $('.login-box .error').fadeIn("slow");
          } else {
            // 更新用户登录信息
            $.ajax({
              url: 'http://www.api.com:8888/Index/login',
              type: 'POST',
              data: {
                username: post['username'],
                password: post['password']
              },
              success: function(rsp) {
                console.log("成功")
              }
            });
            $('.login-box .error').fadeOut("slow");
            // 保存Cookie
            cookie.save('username', user.username, {path: '/'});
            window.location.replace("/");
          };
        }.bind(this)
      });

    }

  }

  render() {
    const styles = require('./Login.css');
    return (
      <div className="login">
        <div className="loginBg bg" id="loginBg"></div>
        <div className="login-box">
          <h2 className="name">登录</h2>
          <div className="error"></div>
          <div className="list-box">
            <label className="label">登录名：</label>
            <input type="text" ref="username" placeholder="请输入账号" className="txt" />
          </div>
          <div className="list-box">
            <label className="label">密　码：</label>
            <input type="password" ref="password" placeholder="请输入密码" className="txt" />
          </div>
          <div className="list-box">
            <button type="submit" className="btn" block ref='submit' onClick={this.login.bind(this)}>登 录</button>
          </div>
          <div className="foot">
            <Link to="/register">没有账号？直接注册</Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;