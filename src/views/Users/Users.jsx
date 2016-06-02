'use strict';

import React from 'react';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';

// 用户列表
class Users extends React.Component {
    
    render() {
        const styles = require('./User.css');
        return (
            <div>
                <Header />
                <Footer />
            </div>
        )
    }
}

export default Users;