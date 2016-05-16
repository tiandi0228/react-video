'use strict';

import React from 'react';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';
import Notice from './../Common/Notice.jsx';
import Price from './../Common/Price.jsx';
import Recharge from './../Common/Recharge.jsx';
import Explain from './../Common/Explain.jsx';

// 首页
class Home extends React.Component {

    render() {
        const styles = require('./Home.css');
        const width = '49%';
        return (
            <div>
                <Header />
                <div className="home">
                    <div className="fl" style={{width:width}}>
                        <Notice />
                        <Recharge />
                    </div>
                    <div className="fr" style={{width:width}}>
                        <Price />
                        <Explain />
                    </div>
                </div>
                <Footer />
            </div >
        )
    }
};

export default Home;