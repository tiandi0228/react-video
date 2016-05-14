import React from 'react';
import cookie from 'react-cookie';

const Login = React.createClass({
  
  componentDidMount: function () {

    // 背景图替换
    this.timer = setInterval(function () {
      for (var i = 0; i < 4; i++) {
        var bg = document.getElementById('loginBg');
        bg.className = 'loginBg bg bg' + Math.ceil(Math.random() * i);
      }
    }.bind(this), 5000);

    // 设置Cookie
    // cookie.remove('username', { path: '/' });
    if (cookie.load('username') != undefined) {
      var oUserName = document.getElementById('username');
      oUserName.value = cookie.load('username');
    }
  },
  
  login: function (e) {
    e.preventDefault();
    var post = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }
    // 保存Cookie
    cookie.save('username', post['username'], { path: '/' });
    $.ajax({
      url: "/addNote",
      type: "post",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(newNote),/*反序列化，到了服务端再被bodypaser.json（）序列化，真够折腾啊*/
      cache: false,
      success: function (notes) {
        console.log("登录成功！");
        notes = this.notesSort(notes);
        this.setState({
          notes: notes
        });
      }.bind(this),
      error: function () {
        console.log("登录失败！");
      }
    });
  },

  render: function () {
    const styles = require('./Login.css');
    return (
      <div className="login">
        <div className="loginBg bg" id="loginBg"></div>
        <div className="login-box">
          <h2 className="name">登录</h2>
          <div className="list">
            <label className="label">登录名：</label>
            <input type="text" ref="username" id="username" placeholder="请输入账号" className="txt" />
          </div>
          <div className="list">
            <label className="label">密　码：</label>
            <input type="password" ref="password" id="password" placeholder="请输入密码" className="txt" />
          </div>
          <div className="list">
            <button type="submit" className="btn" block ref='submit' onClick={this.login}>登 录</button>
          </div>
          <div className="foot">
            <a>没有账号？直接注册</a>
          </div>
        </div>
      </div>
    );
  }
});

export default Login;