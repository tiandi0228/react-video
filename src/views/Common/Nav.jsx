'use strict';

import React from 'react';
import {Link} from 'react-router';

// 导航
class Nav extends React.Component {
    
    render() {
        const styles = require('./Common.css');
        return (
            <nav className="fl">
                <ul>
                    <li><Link to="/">主页</Link></li>
                    <li><Link to="/tasks">任务</Link></li>
                    <li><Link to="/user">用户</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Nav;