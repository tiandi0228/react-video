'use strict';

import React from 'react';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';
import Notice from './Notice.jsx';

// 首页
class Home extends React.Component {
  
    render () {
        return (
            <div>
                <Header />
                <div className="home">
                    <Notice />
                </div>
                <Footer />
            </div>
        )
    }
};

export default Home;