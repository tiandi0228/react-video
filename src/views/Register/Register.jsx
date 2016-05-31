'use strict';

import React from 'react';
import { Link } from 'react-router';

class Register extends React.Component {

    render () {
        const styles = require('./Register.css');
        return (
            <div className="register">
                <h2 className="name">注册</h2>
                <div className="list-box">
                    <label className="label">登录名：</label>
                    <input type="text" ref="username" id="username" placeholder="请输入账号" className="txt" />
                </div>
                <div className="list-box">
                    <label className="label">密　码：</label>
                    <input type="password" ref="password" id="password" placeholder="请输入密码" className="txt" />
                </div>
                <div className="list-box">
                    <label className="label">确认密码：</label>
                    <input type="password" ref="password" id="password" placeholder="请输入确认密码" className="txt" />
                </div>
                <div className="list-box">
                    <button type="submit" className="btn" block ref='submit' onClick={this.login}>注 册</button>
                </div>
                <div className="foot">
                    <Link to="/login">已有账号，直接登录</Link>
                </div>
            </div>
        );
    }
}

export default Register;