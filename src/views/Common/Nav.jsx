'use strict';

import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import $ from 'jquery';

// 导航
class Nav extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: cookie.load('email'),
            group: ''
        };

        $.ajax({
            url: 'http://www.api.com/Index/User',
            type: 'GET',
            data: { email: this.state.email },
            success: function (result) {
                const user = result['data'];
                this.setState({
                    group: user.group
                });
            }.bind(this)
        });
    }

    render() {
        const styles = require('./Common.css');
        let group;
        if(this.state.group === '管理员'){
            group = <li><Link to="/users" activeClassName="active">用户</Link></li>;
        }
        return (
            <nav className="fl">
                <ul>
                    <li><Link to="/">主页</Link></li>
                    <li><Link to="/tasks" activeClassName="active">任务</Link></li>
                    {group}
                </ul>
            </nav>
        )
    }
}

export default Nav;