'use strict';

import React from 'react';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';
import Notice from './../Common/Notice.jsx';
import Price from './../Common/Price.jsx';

// 首页
class Home extends React.Component {
    
    render () {
        const styles = require('./Home.css');
        return (
            <div>
                <Header />
                <div className="home">
                    <Notice />
                    <Price />
                </div>
                <Footer />
            </div>
        )
    }
};

export default Home;