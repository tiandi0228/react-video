import React from 'react';

const Login = React.createClass({



  componentDidMount: function () {
    // 背景图替换
    this.timer = setInterval(function () {
      for (var i = 0; i < 4; i++) {
        var bg = document.getElementById('loginBg');
        bg.className = 'loginBg bg bg' + Math.ceil(Math.random() * i);
      }
    }.bind(this), 5000);
  },

  handleSubmit: function (e) {
    
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookie(name) {
      var arr = document.cookie.split('; ');
      for (var i = 0; i < arr.length; i++) {
        var arr1 = arr[i].split('=');
        if (arr1[0] == name) {
          return arr1[1];
        }
      }
      return '对不起，获取不到Cookie';
    }

    e.preventDefault();
    var post = {
      username: this.refs.username.value,
      password: this.refs.password.value,
    }
    console.log(this.refs.username.value);
    console.log(setCookie(name, this.refs.username.value, 14));
    console.log(getCookie(this.refs.username.value));
  },

  render: function () {
    const styles = require('./Login.css');
    return (
      <div className="login">
        <div className="loginBg bg" id="loginBg"></div>
        <div className="login-box">
          <h2 className="name">登录</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="list">
              <label className="label">账　户</label>
              <input type="text" ref="username" placeholder="请输入账号" className="txt" />
            </div>
            <div className="list">
              <label className="label">密　码</label>
              <input type="password" ref="password" placeholder="请输入密码" className="txt" />
            </div>
            <div className="list">
              <label className="unlogn">
                <input type="checkbox" ref="checkbox" className="fl checkbox" />
                <span className="fl">14天免费登录</span>
              </label>
            </div>
            <div className="list">
              <button type="submit" className="btn" onClick={this.handleSubmit}>登 录</button>
            </div>
          </form>
          <div className="foot">
            <a>免费注册</a>
          </div>
        </div>
      </div>
    );
  }
});

export default Login;