import React from 'react';

const Login = React.createClass({

  getBgUrl: function() {
    return { pic: ['http://image3.cnpp.cn/upload2/news/20130921/162851_97101_url.jpg', 'http://tupian.enterdesk.com/2012/1026/gha/2/enterdesk%20%286%29.jpg', 'http://uploadfile.bizhizu.cn/2014/1220/20141220024927248.jpg'] };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    // var post = {
    //   username : this.refs.username.value,
    //   password : this.refs.password.value,
    // }
    //this.setState({ userInput: event.target.value });
    console.log(this.refs['username']);
  },

  render: function() {
    const styles = require('./Login.css');
    return (
      <div className="login">
        <div className="loginBg"></div>
        <div className="login-box">
          <h2 className="name">登录</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="list">
              <label className="fl label">账　户</label>
              <input type="text" ref="username" placeholder="请输入账号" className="fl txt" />
            </div>
            <div className="list">
              <label className="fl label">密　码</label>
              <input type="password" ref="password" placeholder="请输入密码" className="fl txt" />
            </div>
            <div className="list">
              <button type="submit" className="btn" onClick={this.handleSubmit}>登录</button>
            </div>
          </form>
          <div className="foot">
            <a href>注册</a>
            <a href>找回密码</a>
          </div>
        </div>
      </div>
    );
  }
});