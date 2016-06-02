'use strict';

import React from 'react';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';

// 用户信息
class User extends React.Component {

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

export default User;