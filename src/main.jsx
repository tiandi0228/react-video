import React from 'react';
import { render } from 'react-dom';

// 默认
const Video = React.createClass({
  render: function () {
    const styles = require('./main.css');
    return (
      <div>
          <Login />
      </div>
    );
  }
});

// 登陆
const Login = React.createClass({

  getBgUrl: function () {
    return { pic: ['http://image3.cnpp.cn/upload2/news/20130921/162851_97101_url.jpg', 'http://tupian.enterdesk.com/2012/1026/gha/2/enterdesk%20%286%29.jpg', 'http://uploadfile.bizhizu.cn/2014/1220/20141220024927248.jpg'] };
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var post = {
      username: this.refs.username.value,
      password: this.refs.password.value,
    }
    console.log(post);
  },
  
  render: function () {
    const styles = require('./views/Login/Login.css');
    return (
      <div className="login">
        <div className="loginBg"></div>
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
            <a href>免费注册</a>
          </div>
        </div>
      </div>
    );
  }
});


render(<Video />, document.getElementById('app'), function () { console.log('渲染成功！') });